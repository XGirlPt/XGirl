// pages/api/verify-captcha.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { captchaToken }: { captchaToken?: string } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ message: 'Token do hCaptcha é obrigatório' });
  }

  const secretKey = process.env.HCAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({ message: 'Chave secreta do hCaptcha não configurada' });
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        response: captchaToken,
        secret: secretKey,
      }).toString(),
    });

    const data = await response.json();
    console.log('hCaptcha Response:', data);

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: 'Verificação do hCaptcha falhou' });
    }
  } catch (error) {
    console.error('Erro ao verificar hCaptcha:', error);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
}
