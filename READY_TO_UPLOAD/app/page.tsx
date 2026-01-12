"use client";

import { useState, useEffect } from "react";
import { MOCK_PETS, Pet } from "@/data/mockPets";
import PetCard from "@/components/PetCard";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
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
                        CYBER<span className="text-white">PETS</span>
                    </h1>
                </div>
                <div className="font-mono text-cyan-500 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>NET: ONLINE</span>
                    <span className="text-gray-600">|</span>
                    <span>{time}</span>
                </div>
            </header>

            {/* Hero Text */}
            <section className="relative z-10 max-w-7xl mx-auto pt-16 pb-8 px-4 text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    UPGRADE YOUR MOOD
                </h2>
                <p className="text-xl text-gray-400 font-mono mb-8 max-w-2xl mx-auto">
                    Rent high-fidelity biological companions for short-term emotional support.
                    <br /><span className="text-pink-500">No commitment. Pure serotonin.</span>
                </p>
            </section>

            {/* Pet Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PETS.map(pet => (
                    <PetCard key={pet.id} pet={pet} onRent={handleRent} />
                ))}
            </section>

            {/* Booking Modal (Simulation) */}
            <AnimatePresence>
                {selectedPet && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 border-2 border-pink-500 rounded-2xl w-full max-w-lg p-6 relative shadow-[0_0_50px_rgba(255,0,255,0.3)]"
                        >
                            <button
                                onClick={() => setSelectedPet(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white"
                            >
                                ✕
                            </button>

                            <h3 className="text-2xl font-bold text-pink-500 font-mono mb-1">CONFIRM LINKAGE</h3>
                            <p className="text-gray-400 mb-6">Establish neural connection with:</p>

                            <div className="flex gap-4 mb-6">
                                <img src={selectedPet.image} className="w-24 h-24 object-cover rounded-lg border border-gray-700" />
                                <div>
                                    <h4 className="text-xl font-bold text-white">{selectedPet.name}</h4>
                                    <p className="text-cyan-400 font-mono">{selectedPet.price} CREDITS / HR</p>
                                    <div className="mt-2 text-xs text-green-400 border border-green-900 bg-green-900/20 px-2 py-1 inline-block rounded">
                                        AVAILABLE NOW
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input type="text" placeholder="ENTER YOUR ID (NAME)" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none transition-colors" />
                                <input type="text" placeholder="CONTACT FREQUENCY (EMAIL/LINE)" className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none transition-colors" />
                            </div>

                            <button
                                onClick={() => {
                                    alert("LINKAGE ESTABLISHED! AGENT WILL CONTACT YOU.");
                                    setSelectedPet(null);
                                }}
                                className="w-full mt-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-lg rounded transition-colors shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                            >
                                INITIATE TRANSFER
                            </button>

                            <p className="text-center text-xs text-gray-600 mt-4 font-mono">
                                *Biology rental subject to Terms of Service v20.77
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </main>
    );
}
