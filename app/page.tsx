import WorkshopForm from '@/components/WorkshopForm';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <section className="mx-auto max-w-4xl px-6 py-20">
                <div className="mb-12">
                    <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
                        Live Workshop
                    </p>
                    <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
                        New GTM gateaway for Cloudflare
                    </h1>
                    <p className="max-w-2xl text-lg text-gray-700">
                        Practical workshop sandbox
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="mb-4 text-2xl font-semibold">Workshop Details</h2>
                        <ul className="space-y-3 text-gray-700">
                            <li><strong>Date:</strong> 10 March 2026</li>
                            <li><strong>Time:</strong> 12:00 (Athens time)</li>
                            <li><strong>Location:</strong> Remote </li>
                        </ul>

                        <div className="mt-8">
                            <h3 className="mb-2 text-lg font-semibold">What I’ll learn</h3>
                            <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                <li>How to collect leads with a form</li>
                                <li>How to track submissions with GTM + GA4</li>
                            </ul>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-semibold">Reserve Your Spot</h2>
                        <WorkshopForm />
                    </div>
                </div>
            </section>
        </main>
    );
}