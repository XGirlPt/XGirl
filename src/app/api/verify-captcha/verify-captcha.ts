import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ message: "Token do hCaptcha é obrigatório" });
  }

  try {
    const response = await fetch(`https://hcaptcha.com/siteverify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET}`,
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Verificação do hCaptcha falhou" });
    }
  } catch (error) {
    console.error("Erro ao verificar hCaptcha:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
}
