"use client";

import { useState, useEffect } from "react";
import { MOCK_PETS, Pet } from "@/data/mockPets";
import PetCard from "@/components/PetCard";
import BookingModal from "@/components/BookingModal";
import { AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
    const { t, language, setLanguage } = useLanguage();
    const [time, setTime] = useState<string>("");
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleRent = (pet: Pet) => {
        setSelectedPet(pet);
    };

    return (
        <main className="min-h-screen bg-black text-white relative overflow-x-hidden pb-10">

            {/* Cyberpunk Dynamic Background */}
            <div className="fixed inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    backgroundImage: "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #ff00ff 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                    backgroundPosition: "center top"
                }}
            ></div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full flex justify-between items-center py-4 px-6 border-b border-gray-800 bg-black/90 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="absolute inset-0 w-full h-full bg-pink-500 blur-lg opacity-50 rounded-full animate-pulse"></span>
                        <span className="relative text-2xl">🐱</span>
                    </div>
                    <h1 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                        {t("header_title")}
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    {/* Language Switcher */}
                    <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setLanguage("zh")}
                            className={`px-3 py-1 text-xs font-bold transition-colors ${language === "zh" ? "bg-cyan-600 text-black" : "bg-black text-gray-500 hover:text-white"}`}
                        >
                            中文
                        </button>
                        <button
                            onClick={() => setLanguage("en")}
                            className={`px-3 py-1 text-xs font-bold transition-colors ${language === "en" ? "bg-cyan-600 text-black" : "bg-black text-gray-500 hover:text-white"}`}
                        >
                            EN
                        </button>
                    </div>

                    <div className="font-mono text-cyan-500 text-sm flex items-center gap-2 hidden md:flex">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span>{t("net_online")}</span>
                        <span className="text-gray-600">|</span>
                        <span>{time}</span>
                    </div>
                </div>
            </header>

            {/* Hero Text */}
            <section className="relative z-10 max-w-7xl mx-auto pt-16 pb-8 px-4 text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {t("hero_title")}
                </h2>
                <p className="text-xl text-gray-400 font-mono mb-8 max-w-2xl mx-auto">
                    {t("hero_subtitle_1")}
                    <br /><span className="text-pink-500">{t("hero_subtitle_2")}</span>
                </p>
            </section>

            {/* Pet Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PETS.map(pet => (
                    <PetCard key={pet.id} pet={pet} onRent={handleRent} />
                ))}
            </section>

            {/* Booking Modal */}
            <AnimatePresence>
                {selectedPet && (
                    <BookingModal
                        pet={selectedPet}
                        onClose={() => setSelectedPet(null)}
                    />
                )}
            </AnimatePresence>

        </main>
    );
}
