import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";

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
            const q = query(
                collection(db, COLLECTION_NAME),
                where("petId", "==", petId),
                orderBy("date", "asc"),
                orderBy("time", "asc")
            );

            const querySnapshot = await getDocs(q);
            const bookings: Booking[] = [];
            querySnapshot.forEach((doc) => {
                bookings.push({ id: doc.id, ...doc.data() } as Booking);
            });
            return bookings;
        } catch (error) {
            console.error("Error fetching bookings: ", error);
            // Fallback for missing indexes or permissions silently
            return [];
        }
    },

    // Subscribe to bookings (Real-time)
    subscribeToBookings(petId: string, callback: (bookings: Booking[]) => void) {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("petId", "==", petId),
            orderBy("date", "asc"),
            orderBy("time", "asc")
        );

        return onSnapshot(q, (snapshot) => {
            const bookings: Booking[] = [];
            snapshot.forEach((doc) => {
                bookings.push({ id: doc.id, ...doc.data() } as Booking);
            });
            callback(bookings);
        });
    }
};
