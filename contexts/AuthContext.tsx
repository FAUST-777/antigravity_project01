"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase"; // Added db import
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, save data to Firestore
                const userRef = doc(db, "users", user.uid);

                try {
                    // Check if new user or existing to initialize counts if needed
                    const userSnap = await getDoc(userRef);

                    const userData: any = {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        lastLogin: serverTimestamp(),
                    };

                    // Initial default fields for new users
                    if (!userSnap.exists()) {
                        userData.createdAt = serverTimestamp();
                        userData.rentedCount = 0;
                        userData.rentedOutCount = 0;
                        userData.badge = "/badges/badge1.png"; // Default badge
                    }

                    await setDoc(userRef, userData, { merge: true });
                } catch (error) {
                    console.error("Error saving user to Firestore:", error);
                }
            }
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert("Login Failed. Please try again.");
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
