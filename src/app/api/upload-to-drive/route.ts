import { NextRequest } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: 'nodejs',
};

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 Starting Google Drive upload process...');
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('❌ No file uploaded');
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('📄 File info:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Kiểm tra environment variables
    console.log('🔑 Checking environment variables...');
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      console.error('❌ GOOGLE_SERVICE_ACCOUNT_EMAIL not set');
      return new Response(JSON.stringify({ 
        error: 'GOOGLE_SERVICE_ACCOUNT_EMAIL not configured' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
      console.error('❌ GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY not set');
      return new Response(JSON.stringify({ 
        error: 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY not configured' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Environment variables OK');
    console.log('📨 Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

    // Cấu hình Google Drive API với Service Account
    console.log('🔐 Setting up Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const authClient = await auth.getClient();
    const drive = google.drive({ version: 'v3', auth: auth });
    console.log('✅ Google Auth setup complete');

    // Chuyển đổi File thành Buffer
    console.log('📦 Converting file to buffer...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo stream từ buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Đánh dấu end of stream

    // Tạo tên file unique
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `CV_${timestamp}_${sanitizedName}`;

    console.log('📤 Uploading to Google Drive:', fileName);

    // Upload file lên Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : undefined,
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
    });

    const fileId = response.data.id;
    
    if (!fileId) {
      throw new Error('Failed to upload file to Google Drive - no file ID returned');
    }

    console.log('✅ File uploaded with ID:', fileId);

    // Set quyền public read cho file (để có thể truy cập link)
    console.log('🔓 Setting file permissions...');
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Tạo link truy cập trực tiếp
    const driveLink = `https://drive.google.com/file/d/${fileId}/view`;
    const directLink = `https://drive.google.com/uc?id=${fileId}&export=download`;

    console.log('✅ Google Drive upload successful');
    console.log('🔗 Drive Link:', driveLink);

    return new Response(JSON.stringify({ 
      success: true,
      fileId: fileId,
      driveLink: driveLink,
      directLink: directLink,
      fileName: fileName
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Google Drive upload error:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return new Response(JSON.stringify({ 
      error: 'Failed to upload to Google Drive',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
