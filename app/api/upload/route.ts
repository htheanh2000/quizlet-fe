import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from "@/env.mjs";

export const config = { runtime: 'experimental-edge' }

const s3Client = new S3Client({
    region: 'ap-southeast-1',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY ,
    secretAccessKey: env.AWS_SECRET_KEY ,
  },
});

async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  type: string
): Promise<string> {

  const params = {
    Bucket: 'quizzlet',
    Key: `${Date.now()}-${fileName}`,
    Body: file,
    ContentType: type, // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  const res = await s3Client.send(command);
  const getCommand = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });

  return url;
}

export async function POST(request: NextRequest) {
  try {

    // After some research, I found that the problem was with the version of NodeJS I was using. 
    //I was running version 18.10, but when I upgraded to version 20.1.0 (which is the current version at the time of writing), 
    //the formData started to work.

    let formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImageToS3(
      buffer,
      uuid() + "." + fileExtension,
      mimeType
    );

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return new Response(error, { status: 500 })
    // NextResponse.json({ message: "Error uploading image" });
  }
}

// export async function POST(request: NextRequest) {

//     try {
//         const body =  request.body;
//     } catch (e) {
//       console.log(e)
//       return new Response("fail")
//     }
  
//     return new Response("success")
//   }
  

export async function GET(request: NextRequest) {
      return new Response("Requires Pro Plan")
  }