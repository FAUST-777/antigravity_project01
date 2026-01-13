"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Inter } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function GuidePage() {
    const { t } = useLanguage();

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
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

            {/* Simple Header with Home Link */}
            <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center py-4 px-6 border-b border-gray-800 bg-black/95 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🐱</span>
                    <h1 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                        {t("header_title")}
                    </h1>
                </Link>
                <div className="flex gap-4">
                    <Link href="/" className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors text-sm tracking-widest border border-cyan-900 px-4 py-1 rounded hover:bg-cyan-900/20">
                        {t("nav_home")}
                    </Link>
                    <Link href="/members" className="font-mono text-yellow-400 hover:text-yellow-300 transition-colors text-sm tracking-widest border border-yellow-900 px-4 py-1 rounded hover:bg-yellow-900/20">
                        {t("nav_members")}
                    </Link>
                </div>
            </header>

            <div className="relative z-10 max-w-4xl mx-auto px-4 mt-8">
                <motion.h2
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500"
                >
                    {t("guide_title")}
                </motion.h2>

                {/* Flowcharts */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Lessor Flow */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-bold text-purple-400 mb-8 text-center">{t("guide_role_lessor")}</h3>
                        <div className="space-y-6 relative">
                            {/* Vertical Line for Mobile / Logic connector */}
                            <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent -translate-x-1/2 hidden md:block opacity-30"></div>

                            <StepCard number="1" text={t("step_lessor_1")} color="purple" />
                            <Arrow color="text-purple-500" />
                            <StepCard number="2" text={t("step_lessor_2")} color="purple" />
                            <Arrow color="text-purple-500" />
                            <StepCard number="3" text={t("step_lessor_3")} color="purple" />
                        </div>
                    </motion.div>

                    {/* Tenant Flow */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-bold text-cyan-400 mb-8 text-center">{t("guide_role_tenant")}</h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent -translate-x-1/2 hidden md:block opacity-30"></div>

                            <StepCard number="1" text={t("step_tenant_1")} color="cyan" />
                            <Arrow color="text-cyan-500" />
                            <StepCard number="2" text={t("step_tenant_2")} color="cyan" />
                            <Arrow color="text-cyan-500" />
                            <StepCard number="3" text={t("step_tenant_3")} color="cyan" />
                        </div>
                    </motion.div>
                </div>

                {/* Payment Safety */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-20 bg-gradient-to-r from-gray-900 to-black border border-green-500/30 rounded-xl p-8 text-center shadow-[0_0_30px_rgba(0,255,0,0.1)]"
                >
                    <div className="text-4xl mb-4">🛡️</div>
                    <h3 className="text-2xl font-bold text-green-400 mb-4">{t("payment_safety_title")}</h3>
                    <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        {t("payment_safety_text")}
                    </p>
                </motion.section>

                {/* FAQ */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-3xl mx-auto"
                >
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">{t("qa_title")}</h3>
                    <div className="space-y-6">
                        <FAQItem q={t("qa_1_q")} a={t("qa_1_a")} />
                        <FAQItem q={t("qa_2_q")} a={t("qa_2_a")} />
                        <FAQItem q={t("qa_3_q")} a={t("qa_3_a")} />
                    </div>
                </motion.section>
            </div>
        </main>
    );
}

function StepCard({ number, text, color }: { number: string, text: string, color: "purple" | "cyan" }) {
    const borderColor = color === "purple" ? "border-purple-500" : "border-cyan-500";
    const textColor = color === "purple" ? "text-purple-400" : "text-cyan-400";

    return (
        <div className={`relative z-10 bg-black/80 border ${borderColor} p-4 rounded-lg flex items-center gap-4 hover:scale-105 transition-transform duration-300`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${color === 'purple' ? 'bg-purple-900 text-purple-200' : 'bg-cyan-900 text-cyan-200'}`}>
                {number}
            </div>
            <p className={`font-mono ${textColor} font-bold`}>{text}</p>
        </div>
    );
}

function Arrow({ color }: { color: string }) {
    return (
        <div className={`flex justify-center ${color} text-2xl animate-bounce`}>
            ↓
        </div>
    );
}

function FAQItem({ q, a }: { q: string, a: string }) {
    return (
        <div className="border-b border-gray-800 pb-6 last:border-0">
            <h4 className="text-xl font-bold text-gray-200 mb-2">Q: {q}</h4>
            <p className="text-gray-400 leading-relaxed pl-6 border-l-2 border-gray-700">A: {a}</p>
        </div>
    );
}
