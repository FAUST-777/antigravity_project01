"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Pet } from "@/data/mockPets";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookingService, Booking } from "@/services/bookingService";

interface BookingModalProps {
    pet: Pet;
    onClose: () => void;
}

export default function BookingModal({ pet, onClose }: BookingModalProps) {
    const { t } = useLanguage();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("12");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Subscribe to real-time bookings for this pet
        const unsubscribe = BookingService.subscribeToBookings(pet.id, (data) => {
            setBookings(data);
        });
        return () => unsubscribe();
    }, [pet.id]);

    const handleSubmit = async () => {
        if (!name || !date) return;
        setLoading(true);
        try {
            await BookingService.addBooking({
                petId: pet.id,
                userName: name,
                date,
                time: parseInt(time),
                note
            });
            alert(t("booking_success"));
            onClose();
        } catch (e) {
            console.error(e);
            alert("Error creating booking");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    // Use React Portal to render modal at the document body level
    // This bypasses any z-index or overflow issues from parent containers

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border-2 border-pink-500 rounded-2xl w-full max-w-4xl p-6 relative shadow-[0_0_50px_rgba(255,0,255,0.3)] flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white z-10 p-2"
                >
                    ✕
                </button>

                {/* Left: Booking Form */}
                <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-pink-500 font-mono mb-1">{t("booking_modal_title")}</h3>
                    <div className="flex gap-4 mb-4 items-center">
                        <img src={pet.image} className="w-16 h-16 object-cover rounded-lg border border-gray-700" />
                        <div>
                            <h4 className="text-xl font-bold text-white">{pet.name}</h4>
                            <p className="text-cyan-400 font-mono">{pet.price} {t("credits_hr")}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">{t("booking_form_name")}</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none h-[50px]"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label className="text-gray-400 text-sm block mb-1">{t("booking_form_date")}</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none h-[50px]"
                                />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <label className="text-gray-400 text-sm block mb-1">{t("booking_form_time")}</label>
                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none h-[50px]"
                                >
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <option key={i} value={i}>{i}:00</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">{t("booking_form_note")}</label>
                            <textarea
                                value={note}
                                maxLength={50}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none h-24 resize-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full mt-4 py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-black font-bold text-lg rounded transition-colors shadow-[0_0_20px_rgba(0,255,255,0.4)] active:scale-95"
                    >
                        {loading ? "PROCESSING..." : t("booking_confirm_btn")}
                    </button>
                </div>

                {/* Right: Schedule List */}
                <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {t("current_schedule")}
                    </h3>

                    <div className="overflow-x-auto h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        <table className="w-full text-left font-mono text-sm">
                            <thead className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10 shadow-sm">
                                <tr className="text-gray-500">
                                    <th className="pb-2 pr-2">{t("table_date")}</th>
                                    <th className="pb-2 pr-2">{t("table_time")}</th>
                                    <th className="pb-2 pr-2">{t("table_user")}</th>
                                    <th className="pb-2">{t("table_note")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-600 italic">
                                            {t("no_bookings")}
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((b) => (
                                        <tr key={b.id} className="text-gray-300">
                                            <td className="py-2 pr-2 text-pink-500 whitespace-nowrap">{b.date}</td>
                                            <td className="py-2 pr-2">{b.time}:00</td>
                                            <td className="py-2 pr-2 text-cyan-400 font-bold max-w-[80px] truncate">{b.userName}</td>
                                            <td className="py-2 text-gray-500 break-words min-w-[100px]">{b.note}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body
    );
}
