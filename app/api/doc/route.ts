import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'only-no-store';

export async function GET(request: Request) {
    console.log('bip');
    console.log(request.url);
    try {
        const client = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            undefined,
            process.env.GOOGLE_PRIVATE_KEY,
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
