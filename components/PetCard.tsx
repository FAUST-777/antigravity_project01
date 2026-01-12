"use client";

import { motion } from "framer-motion";
import { Pet } from "@/data/mockPets";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
    pet: Pet;
    onRent: (pet: Pet) => void;
}

export default function PetCard({ pet, onRent }: Props) {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group hover:border-pink-500 transition-colors cursor-pointer"
            onClick={() => onRent(pet)}
        >
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-800">
                    {pet.type.toUpperCase()}
                </div>
            </div>

            <div className="p-4 relative z-20">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold italic text-white group-hover:text-pink-500 transition-colors">{pet.name}</h3>
                    <span className="text-lg font-mono text-cyan-400">{pet.price}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 font-mono">{t("credits_hr")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {pet.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                            #{tag.toUpperCase()}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-400">{t("available")}</span>
                    </div>
                    <button className="text-sm font-bold text-pink-500 hover:text-white transition-colors">
                        {t("book_now")} →
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
