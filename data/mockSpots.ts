export type SpotType = "Park" | "Riverside" | "PetCafe";

export interface Spot {
    id: string;
    name: string;
    type: SpotType;
    lat: number;
    lng: number;
    crowdLevel: number; // 0-100 (Puppy Crowd Level)
    description?: string;
    tags?: string[];
}

export const MOCK_DOG_SPOTS: Spot[] = [
    {
        id: "1",
        name: "大安森林公園",
        type: "Park",
        lat: 25.0296,
        lng: 121.5358,
        crowdLevel: 80,
        description: "台北市最大的狗狗社交中心，草地廣闊。",
        tags: ["Grass", "Social"]
    },
    {
        id: "2",
        name: "迎風狗運動公園",
        type: "Park",
        lat: 25.0715,
        lng: 121.5513,
        crowdLevel: 50,
        description: "專屬狗狗的圍欄區域，可以安心放繩跑跑。",
        tags: ["Fenced", "Agility"]
    },
    {
        id: "3",
        name: "彩虹河濱公園",
        type: "Riverside",
        lat: 25.0560,
        lng: 121.5830,
        crowdLevel: 30,
        description: "河景優美，適合傍晚散步，風比較大。",
        tags: ["River View", "Walk"]
    },
    {
        id: "4",
        name: "華山大草原",
        type: "Park",
        lat: 25.0445,
        lng: 121.5298,
        crowdLevel: 90,
        description: "年輕狗狗很多，假日有市集，比較熱鬧。",
        tags: ["Crowded", "Market"]
    },
    {
        id: "5",
        name: "浪浪別哭 (台北店)",
        type: "PetCafe",
        lat: 25.0495,
        lng: 121.5216,
        crowdLevel: 70,
        description: "中途咖啡廳，歡迎帶狗狗一起來吃飯。",
        tags: ["Food", "Indoor"]
    },
    {
        id: "6",
        name: "永和綠寶石寵物公園",
        type: "Park",
        lat: 25.0180,
        lng: 121.5050,
        crowdLevel: 40,
        description: "新北市的大型寵物公園，分大狗小狗區。",
        tags: ["Segregated", "Grass"]
    }
];
