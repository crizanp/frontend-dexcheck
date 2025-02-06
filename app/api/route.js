import multer from 'multer';
import sharp from 'sharp';
import { NextResponse } from 'next/server';

const upload = multer({ storage: multer.memoryStorage() });

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get('image');
    const buffer = await file.arrayBuffer();

    // Resize image and convert to grayscale
    const resizedImage = await sharp(Buffer.from(buffer))
      .resize(100) // Adjust width for ASCII clarity
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = resizedImage;
    const width = info.width;

    // ASCII characters for brightness levels
    const chars = '@%#*+=-:. ';
    const asciiArt = [];

    for (let i = 0; i < data.length; i += width) {
      const row = data
        .slice(i, i + width)
        .map((pixel) => chars[Math.floor((pixel / 255) * (chars.length - 1))])
        .join('');
      asciiArt.push(row);
    }

    return NextResponse.json({ ascii: asciiArt.join('\n') });
  } catch (error) {
    return NextResponse.json({ error: 'Error processing image' }, { status: 500 });
  }
};
