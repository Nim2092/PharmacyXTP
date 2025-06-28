import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: 'nodejs', // Đảm bảo không chạy trên Edge
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  // Trả về đường dẫn public cho frontend
  const publicUrl = `/uploads/${filename}`;
  return new Response(JSON.stringify({ url: publicUrl }), { status: 200 });
}