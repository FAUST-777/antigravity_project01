"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AuthButton() {
    const { user, signInWithGoogle, logout } = useAuth();
    const { language } = useLanguage();

    if (!user) {
        return (
            <button
                onClick={signInWithGoogle}
                className="px-4 py-2 border border-cyan-500 text-cyan-500 font-mono text-sm hover:bg-cyan-500 hover:text-black transition-colors rounded shadow-[0_0_10px_rgba(0,255,255,0.2)]"
            >
                {/* Google Icon SVG */}
                <span className="mr-2">G</span>
                {language === 'zh' ? "登入 / 註冊" : "LOGIN / REGISTER"}
            </button>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
                <p className="text-xs text-gray-400 font-mono">OPERATOR</p>
                <p className="text-sm text-cyan-400 font-bold font-mono truncate max-w-[100px]">{user.displayName}</p>
            </div>
            {user.photoURL && (
                <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                />
            )}
            <button
                onClick={logout}
                className="text-gray-500 hover:text-pink-500 text-xs font-mono ml-2 border-l border-gray-700 pl-3"
            >
                {language === 'zh' ? "登出" : "LOGOUT"}
            </button>
        </div>
    );
}
