"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

const inter = Inter({ subsets: ["latin"] });

interface UserData {
    uid: string;
    displayName: string;
    photoURL: string;
    createdAt: any;
    rentedCount: number;
    rentedOutCount: number;
    badge: string;
}

export default function MembersPage() {
    const { t } = useLanguage();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Query users, simplified without ordering first to avoid index issues if any
                const q = query(collection(db, "users"));
                const querySnapshot = await getDocs(q);
                const fetchedUsers: UserData[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedUsers.push(doc.data() as UserData);
                });

                // Client side sort by createdAt desc
                fetchedUsers.sort((a, b) => {
                    const dateA = a.createdAt?.seconds || 0;
                    const dateB = b.createdAt?.seconds || 0;
                    return dateB - dateA;
                });

                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "-";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
    };

    return (
        <main className={`min-h-screen bg-black text-white relative overflow-x-hidden pb-20 pt-20 ${inter.className}`}>
            {/* Cyberpunk Dynamic Background (Consistent with Home) */}
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
            <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center py-4 px-6 border-b border-gray-800 bg-black/95 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🐱</span>
                    <h1 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                        {t("header_title")}
                    </h1>
                </Link>
                <div className="flex gap-4">
                    <Link href="/" className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors text-sm tracking-widest border border-cyan-900 px-4 py-1 rounded hover:bg-cyan-900/20">
                        ← {t("nav_home")}
                    </Link>
                </div>
            </header>

            <div className="relative z-10 max-w-6xl mx-auto px-4 mt-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                    {t("members_title")}
                </h2>

                <div className="overflow-x-auto bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                    <table className="w-full text-left font-mono">
                        <thead className="bg-black/80 text-cyan-400 border-b border-gray-700">
                            <tr>
                                <th className="p-4">{t("member_table_date")}</th>
                                <th className="p-4">{t("member_table_avatar")}</th>
                                <th className="p-4">{t("member_table_name")}</th>
                                <th className="p-4">{t("member_table_badge")}</th>
                                <th className="p-4 text-center">{t("member_table_rented_out")}</th>
                                <th className="p-4 text-center">{t("member_table_rented")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500 animate-pulse">Scanning Neural Network...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">No users found in the database.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.uid} className="hover:bg-gray-800/30 transition-colors group">
                                        <td className="p-4 text-gray-400 text-sm">{formatDate(user.createdAt)}</td>
                                        <td className="p-4">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-gray-600 group-hover:border-cyan-500 transition-colors" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xs">?</div>
                                            )}
                                        </td>
                                        <td className="p-4 font-bold text-white group-hover:text-cyan-300 transition-colors">{user.displayName || "Anonymous"}</td>
                                        <td className="p-4">
                                            <div className="relative group/badge">
                                                <img src={user.badge || "/badges/badge1.png"} alt="Badge" className="w-8 h-8 pixelated hover:scale-125 transition-transform cursor-help" />
                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-xs text-white border border-gray-700 rounded opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                                    Cyber Citizen
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center text-purple-400 font-bold">{user.rentedOutCount || 0}</td>
                                        <td className="p-4 text-center text-green-400 font-bold">{user.rentedCount || 0}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
