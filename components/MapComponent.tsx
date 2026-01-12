"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_DOG_SPOTS, Spot } from "@/data/mockSpots";

// Cyberpunk Colors
const getNeonColor = (type: string) => {
    switch (type) {
        case "Park": return "#00ff00"; // Green
        case "Riverside": return "#00ffff"; // Cyan
        case "PetCafe": return "#ff00ff"; // Pink
        default: return "#ffffff";
    }
};

export default function MapComponent() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

    // Default Center (Taipei)
    const [lng] = useState(121.5358);
    const [lat] = useState(25.0296);
    const [zoom] = useState(12);

    useEffect(() => {
        if (map.current) return;
        if (!mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            // CYBERPUNK MAP STYLE (CartoDB Dark Matter)
            style: {
                version: 8,
                sources: {
                    "carto-dark": {
                        type: "raster",
                        tiles: [
                            "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
                            "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
                            "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
                            "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
                        ],
                        tileSize: 256,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    }
                },
                layers: [
                    {
                        id: "carto-dark-layer",
                        type: "raster",
                        source: "carto-dark",
                        paint: {
                            "raster-opacity": 1,
                            "raster-contrast": 0.2 // Enhance darkness
                        }
                    }
                ]
            },
            center: [lng, lat],
            zoom: zoom,
            pitch: 0,
            bearing: 0,
        });

        map.current.addControl(new maplibregl.NavigationControl(), "top-right");

        // Add Neon Markers
        map.current.on("load", () => {
            MOCK_DOG_SPOTS.forEach((spot) => {
                const color = getNeonColor(spot.type);

                const el = document.createElement("div");
                el.className = "marker-dot";
                el.style.width = "18px";
                el.style.height = "18px";
                el.style.borderRadius = "50%";
                el.style.backgroundColor = color;
                el.style.color = color; // For box-shadow inheritance
                el.style.cursor = "pointer";
                el.style.border = "2px solid #fff";

                el.addEventListener("click", () => {
                    setSelectedSpot(spot);
                    map.current?.flyTo({ center: [spot.lng, spot.lat], zoom: 15, duration: 1000 });
                });

                if (map.current) {
                    new maplibregl.Marker({ element: el })
                        .setLngLat([spot.lng, spot.lat])
                        .addTo(map.current);
                }
            });
        });

    }, [lng, lat, zoom]);

    return (
        <div className="relative w-full h-[85vh] rounded-none border-2 border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.5)] bg-black overflow-hidden group">
            {/* Glitch Overlay Effect (Optional CSS trick) */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-[url('/scanline.png')] opacity-10"></div>

            <div ref={mapContainer} className="absolute inset-0 w-full h-full z-0" />

            {/* Cyberpunk HUD Overlay */}
            <div className="absolute top-6 left-6 z-10">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] tracking-tighter">
                    NEON PAWS <span className="text-xs align-top text-white animate-pulse">v1.0</span>
                </h1>
                <div className="mt-2 flex gap-3 text-xs font-mono text-cyan-300">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[var(--neon-green)] rounded-full shadow-[0_0_5px_var(--neon-green)]"></div>Park</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full shadow-[0_0_5px_var(--neon-cyan)]"></div>Riverside</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[var(--neon-pink)] rounded-full shadow-[0_0_5px_var(--neon-pink)]"></div>Cafe</div>
                </div>
            </div>

            {/* Holographic Detail Modal */}
            <AnimatePresence>
                {selectedSpot && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="absolute bottom-6 right-6 w-80 holo-card p-6 text-white z-20 skew-x-[-2deg]"
                    >
                        {/* Holographic Header */}
                        <div className="flex justify-between items-start mb-4 border-b border-cyan-500/50 pb-2">
                            <div>
                                <h3 className="text-2xl font-bold text-neon-cyan">{selectedSpot.name}</h3>
                                <span className="text-xs font-mono text-pink-400">
                                    TYPE: {selectedSpot.type.toUpperCase()}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedSpot(null)}
                                className="text-cyan-500 hover:text-white transition-colors"
                                style={{ textShadow: "0 0 5px cyan" }}
                            >
                                [CLOSE]
                            </button>
                        </div>

                        {/* Content */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2 text-xs font-mono text-gray-400">
                                <span>ACTIVITY LEVEL</span>
                                <span className="text-neon-pink animate-pulse">{selectedSpot.crowdLevel}%</span>
                            </div>
                            {/* Cyberpunk Progress Bar */}
                            <div className="w-full bg-gray-900 border border-gray-700 h-2">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 shadow-[0_0_10px_#ff00ff]"
                                    style={{ width: `${selectedSpot.crowdLevel}%` }}
                                ></div>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4 leading-relaxed font-sans">
                            {selectedSpot.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedSpot.tags?.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-1 border border-green-500 text-green-400 bg-green-500/10">
                                    #{tag.toUpperCase()}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <button className="py-2 bg-cyan-900/50 border border-cyan-500 text-cyan-400 text-xs hover:bg-cyan-500 hover:text-black transition-all">
                                NAVIGATE
                            </button>
                            <button className="py-2 bg-pink-900/50 border border-pink-500 text-pink-400 text-xs hover:bg-pink-500 hover:text-black transition-all">
                                CHECK-IN
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
