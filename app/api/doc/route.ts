import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const client = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            undefined, // @ts-ignore
            process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
            ['https://www.googleapis.com/auth/documents.readonly']
        );

        const gdapi = google.docs({ version: 'v1', auth: client });
        const opt = {
            documentId: process.env.DOC_ID,
        };

        let data = await gdapi.documents.get(opt);

        return NextResponse.json({
            message: data.data,
        });
    } catch (e) {
        console.log('err: ', e);
        return NextResponse.json(
            { message: JSON.stringify({ error: true, message: e }) },
            { status: 400 }
        );
    }
}
