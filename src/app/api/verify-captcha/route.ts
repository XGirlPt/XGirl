// app/api/verify-captcha/route.ts
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(request: Request) {
  try {
    const { captchaToken } = await request.json();

    if (!captchaToken) {
      return NextResponse.json({ success: false, message: 'Token do captcha não fornecido' }, { status: 400 });
    }

    const secret = process.env.HCAPTCHA_SECRET_KEY;
    if (!secret) {
      throw new Error('HCaptcha secret key não configurada.');
    }

    const response = await fetch(`https://hcaptcha.com/siteverify?secret=${secret}&response=${captchaToken}`, {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Falha na verificação do captcha' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
