import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const client = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            undefined,
            '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3IGRTH/oPQLNp\nHCMeJWk8VXtSygqAO2ba/lfr5DmFTheB36OfuhCwOKTaREmFjM/kHD4FE/wJDcDh\n0TvHdl0eQjaiAL8dhz3Pf8S1+y4ZCQiIRHYetNdjgP7j2Pj4hB0MvGuTSJIxG2fS\nQK0GI8vTE47kZ+xVp6HVIMpTzdbEh+Sf8CfRZOzIXvxXB/Zc04dVD8NjMBDCBCEo\nPaQTQR7egfYpZxpYGyixSORRkA7iC99x1hlNKS8ng2Osr/w2NtGGy8JgbPQ7feNF\nYN1YphP0LPv/CGHLW8dn8Z5lzRfS2YgPmK3yItLuKK3XaEKmPGFEp26uykusi+Eu\nEE/go52FAgMBAAECggEABWU5n3taZ9c9RS3UWQyIIIQ/CTroeuVR8mAHbiAZk8Ev\nwlG4/x+nyZ4s0tarn3j9HQu5+UNT+MS3d8/G2TZP2woSlJmKB/aWmx9fR9W6Aqtr\nkKKkiklD7IVKvTxrMkNBadq/uD8T05X3n2m5aOwzRdyv9P0DQqjMOCMEFkEDAJcY\nwYQKyzJGCAiCDaZ0L6zn2PptjNjrH3IU06dsmSv5CMNi0e7jBN2cDTfY4OcYk23g\ni7Ob+ikfZu7GEq8BZAMgL/eiLHQ4RyTlF3BQVsY21pgU7ieaLioscPXBVcvSsiO7\nLAS3IKldBS6NzS31TJpkjz/VEMWtapMCNmJF8BodUQKBgQDyCKBRdIdMVh3tHKkC\nAg6du4rRXzFirpJRjMs6G9SJauYqz2jhLS3pb/6oEG/JzQETpQ89lhh88LJHU1CU\npi3KRjoANNe7BK9rpGNgrEmHonQZduDSVBYSwNB5/GEBFQthscqV05KuDr1DUPv2\nmg6YLbOfdXjJLxt8wxKOE63mOQKBgQDBsZOLh3R5LM2cKrLtIAKxKYgcO4l7jeHb\nyWSDNdw3RlfE+MwZ1PiNzi8A9SyJUXBbME+hm+ZDE+KSI7GRdK6D/CsRvy+R1fW/\nCEh23io+z7zK9EUOElF2/DGVN8a8O8sIXr+BFiidPJnIIsffk0DKDUnQBM+OQZ2G\nREr4GH9RrQKBgAr1FwT5CJMNJwewD3q2yyCa9/rom1zDWH52qFC2J9Ycz9TKVQ40\ntGpoFphXPihdrpnMFDeOjwdBAmE2RWSlbVdF/KQ7wDSITsTJyXH7+sw4L5djiWQc\nSG+K6SVMprucz0oZ+Xj0/iQBKNJeXTnZ2aVMFGC4ucIp7s2kKzfhbjMJAoGBAKdc\n/RRvMqERqYfrDTf/lNPoAwgCGcV8z0/OMN9/Ro0sZuJ36EPZ1fsR0WOOdbEhgWgJ\n0oTd5JTJNdj4ppH8tF6vIbfv7vagXft2+MZdKTuk3IixkImcInAhceZxj3NOZx0Q\nYYD02JskpexcwT/aSP1Nhh4MShutbqN5lx3QbRLxAoGACA1sR9lT67LYOqaqVbwy\ns4XvkhuO5UsD4JA+iMS6hoc0gv3tAZPidos7sVPpr6FNru9fvAYIyagr09hwkTd9\ndv8nER137doJhZG3bkBzZcDYgZvl9aPWXFI+ohYOej5EBePzHFFX3uBmgDOr4qWD\nv6yz5f059RB6LLWs6pYNyNo=\n-----END PRIVATE KEY-----\n',
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
