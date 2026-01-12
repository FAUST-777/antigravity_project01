import { Pet } from "@/data/mockPets";
import { motion } from "framer-motion";
import { Battery, Zap, DollarSign } from "lucide-react";

interface PetCardProps {
    pet: Pet;
    onRent: (pet: Pet) => void;
}

export default function PetCard({ pet, onRent }: PetCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" }}
            className="group relative bg-gray-900 border border-cyan-800 rounded-xl overflow-hidden hover:border-cyan-400 transition-colors"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
                <img
                    src={pet.image}
                    alt={pet.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />

                {/* Price Tag */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur border border-pink-500 text-pink-500 px-3 py-1 rounded-full font-mono text-sm flex items-center shadow-[0_0_10px_#ff00ff]">
                    <DollarSign size={14} className="mr-1" />
                    {pet.price}/HR
                </div>
            </div>

            {/* Info Body */}
            <div className="p-5 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-cyan-400 font-mono tracking-wider">{pet.name}</h3>
                    <span className="text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded uppercase">
                        {pet.type}
                    </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 min-h-[40px] line-clamp-2">
                    {pet.bio}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono text-gray-300">
                    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded border border-gray-700">
                        <Battery size={14} className={pet.battery > 50 ? "text-green-400" : "text-red-400"} />
                        <span>PWR: {pet.battery}%</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded border border-gray-700">
                        <Zap size={14} className="text-yellow-400" />
                        <span>SYNC: READY</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {pet.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 bg-cyan-900/30 text-cyan-300 rounded border border-cyan-900/50">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Rent Button */}
                <button
                    onClick={() => onRent(pet)}
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold font-mono rounded tracking-widest shadow-[0_0_15px_rgba(236,72,153,0.4)] active:scale-95 transition-all"
                >
                    JACK IN [RENT]
                </button>
            </div>
        </motion.div>
    );
}
