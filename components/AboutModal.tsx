"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

interface AboutModalProps {
    onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
    const { t } = useLanguage();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-gray-900 border-2 border-cyan-500 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.3)] max-w-2xl w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-cyan-500 hover:text-white z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-gray-700">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 bottom-0 h-1/3"></div>
                        <Image
                            src="/bondrewd_avatar.png"
                            alt="Creator Avatar"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-cyan-600 rounded-full blur-3xl opacity-20"></div>

                        <h2 className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 relative z-10">
                            {t("about_title")}
                        </h2>

                        <p className="text-gray-300 leading-relaxed font-mono text-sm relative z-10">
                            {t("about_text")}
                        </p>

                        <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500 font-mono">
                            <span>STATUS: OPERATIONAL</span>
                            <span>ID: CREATOR_01</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
