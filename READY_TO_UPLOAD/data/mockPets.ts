export interface Pet {
    id: string;
    name: string;
    type: "Dog" | "Cat";
    image: string;
    price: number; // Credits per hour
    battery: number; // Energy level (0-100)
    bio: string;
    tags: string[];
}

export const MOCK_PETS: Pet[] = [
    {
        id: "1",
        name: "CYBER-DOGE 2077",
        type: "Dog",
        image: "/dog1.png",
        price: 50,
        battery: 85,
        bio: "Enhanced obedience modules installed. Loves neon rain.",
        tags: ["Loyal", "Neon", "Guardian"]
    },
    {
        id: "2",
        name: "NET-RUNNER KITTY",
        type: "Cat",
        image: "/cat1.png",
        price: 75,
        battery: 100,
        bio: "Found sleeping on server racks. Purrs at 60Hz frequency.",
        tags: ["Hacker", "Warm", "Quiet"]
    },
    {
        id: "3",
        name: "GOLDEN_AR_V2",
        type: "Dog",
        image: "/dog2.png",
        price: 60,
        battery: 92,
        bio: "Equipped with emotion-sensing AR glasses. Best emotional support.",
        tags: ["Friendly", "Smart", "Therapy"]
    },
    {
        id: "4",
        name: "POD-CAT OMEGA",
        type: "Cat",
        image: "/cat2.png",
        price: 90,
        battery: 45,
        bio: "Portable containment unit included. Safe for toxic city air.",
        tags: ["Travel", "Compact", "Rare"]
    }
];
