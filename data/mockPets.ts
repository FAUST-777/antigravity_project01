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
    },
    {
        id: "5",
        name: "NEON-HUSKY X1",
        type: "Dog",
        image: "/pets/pet_neon_husky.png",
        price: 85,
        battery: 98,
        bio: "Hyper-active unit with integrated subwoofer howl. Requires high energy play.",
        tags: ["Fast", "Loud", "Party"]
    },
    {
        id: "6",
        name: "VOID-STALKER",
        type: "Cat",
        image: "/pets/pet_void_stalker.png",
        price: 120,
        battery: 70,
        bio: "Stealth module active. You won't see it coming until it demands affection.",
        tags: ["Stealth", "Clingy", "Elite"]
    },
    {
        id: "7",
        name: "MECHA-PUG V4",
        type: "Dog",
        image: "/pets/pet_mecha_pug.png",
        price: 45,
        battery: 60,
        bio: "Low-maintenance breathing apparatus. Optimized for napping protocols.",
        tags: ["Chill", "Vintage", "Rugged"]
    },
    {
        id: "8",
        name: "DATA-BITES",
        type: "Dog",
        image: "/pets/pet_data_bites.png",
        price: 55,
        battery: 88,
        bio: "Retrieves balls and lost packets. Good boy algorithm v9.0 installed.",
        tags: ["Playful", "Smart", "Network"]
    },
    {
        id: "9",
        name: "SYNTH-MAINE",
        type: "Cat",
        image: "/pets/pet_synth_maine.png",
        price: 95,
        battery: 90,
        bio: "Large scale distinct unit. Fur density increased by 200% for maximum comfort.",
        tags: ["Fluffy", "Giant", "Premium"]
    },
    {
        id: "10",
        name: "PROTO-SHIBA",
        type: "Dog",
        image: "/pets/pet_proto_shiba.png",
        price: 110,
        battery: 100,
        bio: "The original meme protocol. Accepts payment in head pats and treats.",
        tags: ["Popular", "Meme", "Legend"]
    },
    {
        id: "11",
        name: "QUANTUM-TABBY",
        type: "Cat",
        image: "/pets/pet_quantum_tabby.png",
        price: 65,
        battery: 82,
        bio: "Existing in multiple states of cute simultaneously. Handle with uncertainty.",
        tags: ["Mystery", "Cute", "Quantum"]
    },
    {
        id: "12",
        name: "CHROMIUM-LAB",
        type: "Dog",
        image: "/pets/pet_chromium_lab.png",
        price: 70,
        battery: 94,
        bio: "Standard issue loyalty chip. Very shiny coat with reflection mapping.",
        tags: ["Classic", "Shiny", "Friendly"]
    }
];
