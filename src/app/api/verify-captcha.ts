// pages/api/verify-captcha.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface VerifyCaptchaResponse {
  success: boolean;
  [key: string]: any;

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ success: false, message: 'Token do captcha não fornecido' });
  }

  try {
    const secret = process.env.HCAPTCHA_SECRET_KEY;
    if (!secret) {
      throw new Error('HCaptcha secret key não configurada.');
    }

    const response = await fetch(`https://hcaptcha.com/siteverify?secret=${secret}&response=${captchaToken}`, {
      method: 'POST',
    });

    const data: VerifyCaptchaResponse = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: 'Falha na verificação do captcha' });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
