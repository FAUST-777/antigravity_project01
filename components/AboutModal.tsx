"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PetStatsService, PetStats } from "@/services/petStatsService";
import { MOCK_PETS } from "@/data/mockPets";

interface AboutModalProps {
    onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
    const { t } = useLanguage();
    const [isDogeRevealed, setIsDogeRevealed] = useState(false);

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
                    className="absolute top-4 right-4 text-cyan-500 hover:text-white z-[60] bg-black/50 rounded-full p-2 backdrop-blur-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div
                        className="w-full md:w-1/2 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-gray-700 cursor-pointer group"
                        onClick={() => setIsDogeRevealed(!isDogeRevealed)}
                    >
                        <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-gray-900 to-transparent z-10 h-1/3 pointer-events-none"></div>
                        <Image
                            src={isDogeRevealed ? "/cyber_doge.png" : "/bondrewd_avatar.png"}
                            alt="Creator Avatar"
                            fill
                            className="object-cover transition-opacity duration-300"
                        />
                        {/* Hover Hint */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <span className="text-cyan-400 font-mono text-xs tracking-widest">[CLICK_TO_HACK]</span>
                        </div>
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

                        <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500 font-mono mb-4">
                            <span>STATUS: OPERATIONAL</span>
                            <span>ID: CREATOR_01</span>
                        </div>

                        {/* Stats Table */}
                        <div className="border-t border-gray-800 pt-6">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4">{t("stats_title")}</h3>
                            <div className="overflow-x-auto max-h-48 overflow-y-auto custom-scrollbar bg-black/40 rounded border border-gray-700">
                                <table className="w-full text-left font-mono text-sm">
                                    <thead className="bg-gray-800 text-gray-400 sticky top-0">
                                        <tr>
                                            <th className="p-2">{t("table_pet")}</th>
                                            <th className="p-2 text-center">{t("table_likes")}</th>
                                            <th className="p-2 text-center">{t("table_bookings")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        <StatsTableRows />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function StatsTableRows() {
    const [stats, setStats] = useState<PetStats[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await PetStatsService.getAllPetStats();
            setStats(data);
        };
        fetchStats();
    }, []);

    // Merge mock data (for image/name) with firestore stats
    const rows = MOCK_PETS.map(pet => {
        const petStat = stats.find(s => s.id === pet.id);
        return {
            ...pet,
            likes: petStat?.likes || 0,
            bookings: petStat?.bookings || 0
        };
    }).sort((a, b) => b.bookings - a.bookings); // Sort by bookings desc

    return (
        <>
            {rows.map(pet => (
                <tr key={pet.id} className="hover:bg-gray-800/50">
                    <td className="p-2 flex items-center gap-2">
                        <img src={pet.image} className="w-8 h-8 rounded object-cover" />
                        <span className="text-white text-xs truncate max-w-[100px]">{pet.name}</span>
                    </td>
                    <td className="p-2 text-center text-pink-400 font-bold">{pet.likes} ❤️</td>
                    <td className="p-2 text-center text-green-400 font-bold">{pet.bookings} 📅</td>
                </tr>
            ))}
        </>
    );
}
