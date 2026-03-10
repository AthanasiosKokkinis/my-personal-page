'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

type FormState = {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    notes: string;
    consent: boolean;
};

const initialState: FormState = {
    fullName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
    consent: false,
};

export default function WorkshopForm() {
    const router = useRouter();
    const [form, setForm] = useState<FormState>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const pushEvent = (event: string, extra?: Record<string, unknown>) => {
        if (typeof window === 'undefined') return;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event,
            ...extra,
        });
    };

    const handleFocus = () => {
        pushEvent('form_start', {
            form_name: 'workshop_registration',
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!form.consent) {
            setError('You must accept the privacy consent.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/workshop-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = (await response.json()) as { ok?: boolean; error?: string };

            if (!response.ok || !data.ok) {
                throw new Error(data.error || 'Submission failed');
            }

            pushEvent('form_submit', {
                form_name: 'workshop_registration',
            });

            pushEvent('generate_lead', {
                form_name: 'workshop_registration',
                lead_type: 'workshop',
            });

            router.push('/thank-you');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit} onFocus={handleFocus}>
            <div>
                <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                    Full name
                </label>
                <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    required
                />
            </div>

            <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                    Phone
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
            </div>

            <div>
                <label htmlFor="company" className="mb-1 block text-sm font-medium">
                    Company / Role
                </label>
                <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
            </div>

            <div>
                <label htmlFor="notes" className="mb-1 block text-sm font-medium">
                    Notes
                </label>
                <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="min-h-[120px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
            </div>

            <label className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => updateField('consent', e.target.checked)}
                    className="mt-1"
                    required
                />
                <span className="text-sm text-gray-700">
          I agree to be contacted regarding this workshop.
        </span>
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
                {loading ? 'Submitting...' : 'Register now'}
            </button>
        </form>
    );
}