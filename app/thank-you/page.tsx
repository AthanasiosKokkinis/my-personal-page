'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}


export default function ThankYouPage() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'thank_you_page_view',
            page_type: 'thank_you',
        });
    }, []);

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-6">
            <div className="max-w-xl rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
                <h1 className="mb-4 text-4xl font-bold">Thank you</h1>
                <p className="text-lg text-gray-700">
                    Your registration was received successfully. We’ll contact you soon.
                </p>
            </div>
        </main>
    );
}