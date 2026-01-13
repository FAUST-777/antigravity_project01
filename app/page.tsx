"use client";

import { useState, useEffect } from "react";
import { MOCK_PETS, Pet } from "@/data/mockPets";
import PetCard from "@/components/PetCard";
import BookingModal from "@/components/BookingModal";
import AboutModal from "@/components/AboutModal";
import DonateModal from "@/components/DonateModal";
import AuthButton from "@/components/AuthButton";
import { AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function Home() {
    const { t, language, setLanguage } = useLanguage();
    const [time, setTime] = useState<string>("");
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [showAbout, setShowAbout] = useState(false);
    const [showDonate, setShowDonate] = useState(false);

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleRent = (pet: Pet) => {
        setSelectedPet(pet);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <main className="min-h-screen bg-black text-white relative overflow-x-hidden pb-10 pt-20">

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

                {/* Header - FIXED */}
                <header className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col md:flex-row justify-between items-center py-2 md:py-4 px-4 md:px-6 border-b border-gray-800 bg-black/95 backdrop-blur-md shadow-lg shadow-cyan-900/10 transition-all duration-300 gap-2 md:gap-0">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
                        <div className="relative">
                            <span className="absolute inset-0 w-full h-full bg-pink-500 blur-lg opacity-50 rounded-full animate-pulse"></span>
                            <span className="relative text-2xl">🐱</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] block">
                            {t("header_title")}
                        </h1>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex items-center gap-6">
                        <ul className="flex items-center gap-6 font-mono font-bold text-sm tracking-widest hidden md:flex">
                            <li>
                                <button onClick={scrollToTop} className="text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all">
                                    {t("nav_home")}
                                </button>
                            </li>
                            <li>
                                <Link href="/guide" className="text-gray-400 hover:text-green-400 hover:drop-shadow-[0_0_5px_rgba(74,222,128,0.8)] transition-all">
                                    {t("nav_guide")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/members" className="text-gray-400 hover:text-yellow-400 hover:drop-shadow-[0_0_5px_rgba(250,204,21,0.8)] transition-all">
                                    {t("nav_members")}
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => setShowAbout(true)} className="text-gray-400 hover:text-purple-400 hover:drop-shadow-[0_0_5px_rgba(168,85,247,0.8)] transition-all">
                                    {t("nav_about")}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setShowDonate(true)} className="text-gray-400 hover:text-pink-400 hover:drop-shadow-[0_0_5px_rgba(236,72,153,0.8)] transition-all">
                                    {t("nav_donate")}
                                </button>
                            </li>
                        </ul>

                        {/* Mobile Nav Toggle (Simplified for now - just using buttons in top bar for critical actions if space permits, or rely on hamburger later. For this request, I'll keep the main nav visible or add basic responsive hiding) */}
                        {/* Actually, user requested "head bar to include these", I'll make sure they fit or stack properly. 
                            If mobile, space is tight. I'll put text buttons.
                        */}
                    </nav>

                    <div className="flex items-center gap-4 pl-0 md:pl-4 border-t border-gray-800 md:border-t-0 md:border-l border-gray-800 w-full md:w-auto justify-center md:justify-end py-2 md:py-0 order-2 md:order-none">
                        <AuthButton />
                        {/* Language Switcher */}
                        <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setLanguage("zh")}
                                className={`px-2 py-1 text-xs font-bold transition-colors ${language === "zh" ? "bg-cyan-600 text-black" : "bg-black text-gray-500 hover:text-white"}`}
                            >
                                中
                            </button>
                            <button
                                onClick={() => setLanguage("en")}
                                className={`px-2 py-1 text-xs font-bold transition-colors ${language === "en" ? "bg-cyan-600 text-black" : "bg-black text-gray-500 hover:text-white"}`}
                            >
                                EN
                            </button>
                        </div>
                    </div>

                    {/* Mobile Nav Links - Layer 3 */}
                    <div className="md:hidden flex justify-around items-center w-full py-2 border-t border-gray-800 order-3">
                        <button onClick={scrollToTop} className="font-mono text-cyan-400 font-bold tracking-widest text-sm hover:text-cyan-300 shadow-cyan-500/20">{t("nav_home")}</button>
                        <Link href="/guide" className="font-mono text-green-400 font-bold tracking-widest text-sm hover:text-green-300">{t("nav_guide")}</Link>
                        <Link href="/members" className="font-mono text-yellow-400 font-bold tracking-widest text-sm hover:text-yellow-300">{t("nav_members")}</Link>
                        <button onClick={() => setShowAbout(true)} className="font-mono text-purple-400 font-bold tracking-widest text-sm hover:text-purple-300">{t("nav_about")}</button>
                        <button onClick={() => setShowDonate(true)} className="font-mono text-pink-400 font-bold tracking-widest text-sm hover:text-pink-300">{t("nav_donate")}</button>
                    </div>
                </header>

                {/* Mobile Menu Bar (Bottom fixed for easier access or just keep top? User asked for TOP fixed)
                    Let's add a small mobile nav row below the main header if on mobile screens, or just rely on the main header flex wrap
                */}
                {/* Header End */}

                {/* Hero Text */}
                <section className="relative z-10 max-w-7xl mx-auto pt-16 md:pt-16 pb-8 px-4 text-center mt-10 md:mt-0">
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

            </main>

            {/* Modals */}
            <AnimatePresence>
                {selectedPet && (
                    <BookingModal
                        pet={selectedPet}
                        onClose={() => setSelectedPet(null)}
                    />
                )}
                {showAbout && (
                    <AboutModal onClose={() => setShowAbout(false)} />
                )}
                {showDonate && (
                    <DonateModal onClose={() => setShowDonate(false)} />
                )}
            </AnimatePresence>
        </>
    );
}
