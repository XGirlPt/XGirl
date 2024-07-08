import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';
import supabase from '@/database/supabase';
import path from 'path';
import fs from 'fs';

// Path to the watermark image
const watermarkImagePath = path.join(process.cwd(), 'public', 'logo.png');
const watermarkImageBuffer = fs.readFileSync(watermarkImagePath);

// Function to add watermark
async function addWatermark(imageBuffer: Buffer, scale: number = 0.2): Promise<Buffer> {
  const image = await loadImage(imageBuffer);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  const watermark = await loadImage(watermarkImageBuffer);
  const watermarkWidth = watermark.width * scale;
  const watermarkHeight = watermark.height * scale;
  const x = (image.width - watermarkWidth) / 2;
  const y = (image.height - watermarkHeight) / 2;
  ctx.globalAlpha = 0.4;
  ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

  return canvas.toBuffer();
}

export async function POST(req: NextRequest) {
  try {
    const { image, userUID, fileName } = await req.json();

    const buffer = Buffer.from(image, 'base64');
    const watermarkedBuffer = await addWatermark(buffer, 0.3);
    const webpBuffer = await sharp(watermarkedBuffer).webp().toBuffer();

    const filePath = `${userUID}/${fileName.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}.webp`;

    const { data, error } = await supabase.storage
      .from("profileFoto")
      .upload(filePath, webpBuffer, { contentType: 'image/webp' });

    if (error) throw new Error(error.message);

    const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
    return NextResponse.json({ url: publicURLFoto });
  } catch (error: any) {
    console.error("Erro durante o upload:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
