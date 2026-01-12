"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
    const { language } = useLanguage();

    return (
        <footer className="w-full border-t border-gray-900 bg-black/80 backdrop-blur-sm mt-20 py-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center md:items-start text-gray-500 text-xs font-mono">
                    <p>© 2077 DOGE_WILLIE NETWORK. ALL RIGHTS RESERVED.</p>
                    <p className="text-gray-700">STATUS: OPERATIONAL</p>
                </div>

                <div className="flex gap-6 text-sm font-mono text-cyan-500">
                    <Link href="/privacy" className="hover:text-pink-500 hover:underline">
                        {language === 'zh' ? '隱私權政策' : 'PRIVACY POLICY'}
                    </Link>
                    <Link href="/terms" className="hover:text-pink-500 hover:underline">
                        {language === 'zh' ? '著作權條款' : 'TERMS & COPYRIGHT'}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
