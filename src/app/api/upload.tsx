import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';
import supabase from '@/database/supabase';
import watermarkImage from '../../../public/logo.png'; // Import the watermark image

// Função para adicionar marca d'água
async function addWatermark(
  imageBuffer: Buffer,
  scale: number = 0.2
): Promise<Buffer> {
  // Use sharp to load the image buffer
  const image = await sharp(imageBuffer).toBuffer();
  const imageCanvas = await loadImage(image);
  
  const canvas = createCanvas(imageCanvas.width, imageCanvas.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageCanvas, 0, 0);

  // Load the watermark image
  const watermark = await loadImage(watermarkImage.src);
  const watermarkWidth = watermark.width * scale;
  const watermarkHeight = watermark.height * scale;
  const x = (imageCanvas.width - watermarkWidth) / 2;
  const y = (imageCanvas.height - watermarkHeight) / 2;
  
  ctx.globalAlpha = 0.4;
  ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

  return canvas.toBuffer();  // Return the watermarked image as a buffer
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { image, userUID, fileName } = req.body;

      // Convert base64 image to a buffer
      const buffer = Buffer.from(image, 'base64');
      
      // Add watermark to the image
      const watermarkedBuffer = await addWatermark(buffer, 0.3);
      
      // Convert the watermarked image to webp format using sharp
      const webpBuffer = await sharp(watermarkedBuffer).webp().toBuffer();

      // Construct the file path for storing the image
      const filePath = `${userUID}/${fileName.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}`;

      // Upload the image to Supabase storage
      const { data, error } = await supabase.storage
        .from('profileFoto')
        .upload(filePath, webpBuffer, { contentType: 'image/webp' });

      if (error) throw new Error(error.message);

      // Generate the public URL of the uploaded file
      const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;

      // Send the response with the public URL
      res.status(200).json({ url: publicURLFoto });
    } catch (error: any) {
      console.error("Erro durante o upload:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
