import { NextRequest, NextResponse } from 'next/server';

type WorkshopPayload = {
    fullName?: string;
    email?: string;
    phone?: string;
    company?: string;
    notes?: string;
    consent?: boolean;
};

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as WorkshopPayload;

        const fullName = body.fullName?.trim() || '';
        const email = body.email?.trim() || '';
        const phone = body.phone?.trim() || '';
        const company = body.company?.trim() || '';
        const notes = body.notes?.trim() || '';
        const consent = Boolean(body.consent);

        if (!fullName) {
            return NextResponse.json(
                { ok: false, error: 'Full name is required' },
                { status: 400 }
            );
        }

        if (!email) {
            return NextResponse.json(
                { ok: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        if (!consent) {
            return NextResponse.json(
                { ok: false, error: 'Consent is required' },
                { status: 400 }
            );
        }

        console.log('New workshop registration:', {
            fullName,
            email,
            phone,
            company,
            notes,
            submittedAt: new Date().toISOString(),
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('workshop-register error:', error);

        return NextResponse.json(
            { ok: false, error: 'Invalid request' },
            { status: 500 }
        );
    }
}