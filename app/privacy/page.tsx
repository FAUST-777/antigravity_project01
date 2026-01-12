export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 px-4 pb-12 max-w-4xl mx-auto font-mono text-gray-300">
            <h1 className="text-3xl font-bold text-cyan-500 mb-8 border-b border-gray-800 pb-4">
                PRIVACY POLICY (隱私權政策)
            </h1>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl text-pink-500 mb-2">1. Data Collection</h2>
                    <p>We collect minimal data (Name, Booking Date) solely for the purpose of establishing a neural link with our cyberpets. Your emotional data is not stored permanently.</p>
                </section>

                <section>
                    <h2 className="text-xl text-pink-500 mb-2">2. Cookies</h2>
                    <p>We use local storage to remember your language preference and booking history. No third-party tracking cookies are used, except for standard Google/Firebase authentication tokens if you choose to log in.</p>
                </section>

                <section>
                    <h2 className="text-xl text-pink-500 mb-2">3. Third Party Services</h2>
                    <p>Payments are processed via secure PayPal links. We do not store financial information.</p>
                </section>

                <div className="p-4 border border-gray-800 bg-gray-900/50 rounded mt-8 text-xs text-gray-500">
                    Last Updated: 2077-01-13
                </div>
            </div>
        </div>
    );
}
