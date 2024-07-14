import { NextRequest, NextResponse } from 'next/server';
 
type ResponseData = {
  message: string
}

export function GET(req: NextRequest): NextResponse<ResponseData> {
  return new NextResponse(JSON.stringify({ message: "Hello from ionion api" }), {
    status: 200,
  });
}