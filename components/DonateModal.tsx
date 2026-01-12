"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface DonateModalProps {
    onClose: () => void;
}

export default function DonateModal({ onClose }: DonateModalProps) {
    const { t } = useLanguage();

    const handleDonate = () => {
        // Fake link action
        window.open("https://paypal.com", "_blank");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black border border-pink-500 rounded-lg max-w-md w-full p-8 relative shadow-[0_0_30px_rgba(255,0,255,0.4)]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center">
                    <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="text-4xl">💎</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">{t("donate_title")}</h2>
                    <p className="text-gray-400 mb-8 font-mono text-sm">
                        {t("donate_text")}
                    </p>

                    <button
                        onClick={handleDonate}
                        className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold tracking-widest rounded transition-all transform hover:scale-105 shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        <span>{t("donate_payout_btn")}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>

                    <div className="mt-4 text-xs text-gray-600 font-mono">
                        SECURE CONNECTION ESTABLISHED
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
