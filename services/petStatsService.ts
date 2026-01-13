import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove,
    onSnapshot,
    runTransaction,
    query,
    getDocs
} from "firebase/firestore";

export interface PetStats {
    id: string; // matches petId
    likes: number;
    bookings: number;
    likedBy: string[]; // array of userIds
}

export const PetStatsService = {
    // Get real-time stats for a specific pet
    subscribeToStats: (petId: string, callback: (stats: PetStats | null) => void) => {
        const docRef = doc(db, "pet_stats", petId);
        return onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                callback({ id: doc.id, ...doc.data() } as PetStats);
            } else {
                callback({ id: petId, likes: 0, bookings: 0, likedBy: [] });
            }
        });
    },

    // Get all stats for the summary table
    getAllPetStats: async (): Promise<PetStats[]> => {
        const q = query(collection(db, "pet_stats"));
        const snapshot = await getDocs(q);
        const stats: PetStats[] = [];
        snapshot.forEach((doc) => {
            stats.push({ id: doc.id, ...doc.data() } as PetStats);
        });
        return stats;
    },

    // Toggle like (transactional to ensure consistency)
    toggleLike: async (petId: string, userId: string) => {
        const statsRef = doc(db, "pet_stats", petId);

        try {
            await runTransaction(db, async (transaction) => {
                const statsDoc = await transaction.get(statsRef);

                if (!statsDoc.exists()) {
                    // Create if doesn't exist
                    transaction.set(statsRef, {
                        likes: 1,
                        bookings: 0,
                        likedBy: [userId]
                    });
                } else {
                    const data = statsDoc.data();
                    const likedBy = data.likedBy || [];

                    if (likedBy.includes(userId)) {
                        // Unlike
                        transaction.update(statsRef, {
                            likes: increment(-1),
                            likedBy: arrayRemove(userId)
                        });
                    } else {
                        // Like
                        transaction.update(statsRef, {
                            likes: increment(1),
                            likedBy: arrayUnion(userId)
                        });
                    }
                }
            });
        } catch (e) {
            console.error("Error toggling like:", e);
            throw e;
        }
    },

    // Increment booking count
    incrementBooking: async (petId: string) => {
        const statsRef = doc(db, "pet_stats", petId);
        try {
            // Use set with merge to handle cases where doc doesn't exist yet
            await setDoc(statsRef, {
                bookings: increment(1)
            }, { merge: true });
        } catch (e) {
            console.error("Error incrementing booking:", e);
            throw e;
        }
    }
};
