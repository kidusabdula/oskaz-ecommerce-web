// app/api/files/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // Await the params as required by Next.js 13+
  const resolvedParams = await params;
  const path = resolvedParams.path.join('/');
  
  // Get the ERP API URL from environment variables
  const erpApiUrl = process.env.NEXT_PUBLIC_ERP_API_URL;
  
  if (!erpApiUrl) {
    return NextResponse.json(
      { error: 'ERP API URL not configured' },
      { status: 500 }
    );
  }
  
  try {
    // Fetch the file from the ERP system
    const fileUrl = `${erpApiUrl}/files/${path}`;
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Return the file with the appropriate content type
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for a year
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch file' },
      { status: 500 }
    );
  }
}