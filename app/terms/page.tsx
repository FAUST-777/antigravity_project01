export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 px-4 pb-12 max-w-4xl mx-auto font-mono text-gray-300">
            <h1 className="text-3xl font-bold text-cyan-500 mb-8 border-b border-gray-800 pb-4">
                TERMS & COPYRIGHT (著作權條款)
            </h1>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl text-pink-500 mb-2">1. Usage Rights</h2>
                    <p>The CyberPets listed here are the intellectual property of Doge_Willie. Generating earnings from re-renting our units is strictly prohibited.</p>
                </section>

                <section>
                    <h2 className="text-xl text-pink-500 mb-2">2. Image License</h2>
                    <p>The visual assets (Cyber Doge, Neon Husky) are generated artifacts. You may view them, but do not right-click save to create NFTs.</p>
                </section>

                <section>
                    <h2 className="text-xl text-pink-500 mb-2">3. Disclaimer</h2>
                    <p>We are not responsible for any serotonin overdose or accidental attachment to digital entities.</p>
                </section>

                <div className="p-4 border border-gray-800 bg-gray-900/50 rounded mt-8 text-xs text-gray-500">
                    Last Updated: 2077-01-13
                </div>
            </div>
        </div>
    );
}
