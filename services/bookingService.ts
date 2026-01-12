import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";

export interface Booking {
    id?: string;
    petId: string;
    userName: string;
    date: string; // YYYY-MM-DD
    time: number; // 0-23
    note: string;
    createdAt: number;
}

const COLLECTION_NAME = "bookings";

export const BookingService = {
    // Add a new booking
    async addBooking(booking: Omit<Booking, "id" | "createdAt">) {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...booking,
                createdAt: Date.now()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error adding booking: ", error);
            throw error;
        }
    },

    // Get bookings for a specific pet
    async getBookingsByPet(petId: string): Promise<Booking[]> {
        try {
            // QUERY FIX: Removed orderBy clauses to avoid "Missing Index" errors on Firestore
            // We will filter by petId only and sort in the client application
            const q = query(
                collection(db, COLLECTION_NAME),
                where("petId", "==", petId)
            );

            const querySnapshot = await getDocs(q);
            const bookings: Booking[] = [];
            querySnapshot.forEach((doc) => {
                bookings.push({ id: doc.id, ...doc.data() } as Booking);
            });

            // Client-side sorting
            return bookings.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA === dateB ? a.time - b.time : dateA - dateB;
            });
        } catch (error) {
            console.error("Error fetching bookings: ", error);
            return [];
        }
    },

    // Subscribe to bookings (Real-time)
    subscribeToBookings(petId: string, callback: (bookings: Booking[]) => void) {
        // QUERY FIX: Removed orderBy clauses to avoid "Missing Index" errors
        const q = query(
            collection(db, COLLECTION_NAME),
            where("petId", "==", petId)
        );

        return onSnapshot(q, (snapshot) => {
            const bookings: Booking[] = [];
            snapshot.forEach((doc) => {
                bookings.push({ id: doc.id, ...doc.data() } as Booking);
            });

            // Client-side sorting before passing to callback
            bookings.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA === dateB ? a.time - b.time : dateA - dateB;
            });

            callback(bookings);
        }, (error) => {
            console.error("Error subscribing to bookings:", error);
        });
    }
};
