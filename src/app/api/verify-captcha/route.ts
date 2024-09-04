// app/api/verify-captcha/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { captchaToken } = await request.json();

    // hCaptcha verification endpoint
    const secret = process.env.HCAPTCHA_SECRET; // Ensure you have the secret key stored in environment variables
    const response = await fetch(`https://hcaptcha.com/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: captchaToken,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'CAPTCHA verification failed' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 500 });
  }
}
