import React, { useState } from 'react';
import { ScanEye, EyeOff, Activity, Crosshair, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Örnek Hotspot Veri Altyapısı
// Gerçek uygulamada bu veriler bir props veya context üzerinden gelecektir.
// We will accept hotspots as props to keep it dynamic as per previous architecture
interface Hotspot {
    id: number | string;
    top: string;
    left: string;
    title: string;
    content: string;
}

interface HeatmapSpot {
    id: number | string;
    top: string;
    left: string;
    size: string; // e.g. "120px" or "20%"
    color: string; // e.g. "rgba(255, 0, 0, 0.6)"
    intensity: number; // 0.0 - 1.0 (opacity)
}

interface AnalysisShape {
    id: number | string;
    type: 'rect' | 'circle';
    top: string;
    left: string;
    width?: string;
    height?: string;
    r?: string; // radius for circle
    label: string;
    color?: string;
}

interface AnatomyViewportProps {
    imageSrc: string;
    hotspots?: Hotspot[];
    heatmapSpots?: HeatmapSpot[];
    analysisShapes?: AnalysisShape[];
}

const defaultHotspots: Hotspot[] = [
    {
        id: 1,
        top: '45%',
        left: '50%',
        title: 'Bilişsel Odak Noktası (Primary Focus)',
        content: 'Büyük, beyaz tipografi ve merkezi konumlandırma, kullanıcının dikkatini doğrudan ana değer önerisine (Value Proposition) çeker. Arka plan kontrastı okunabilirliği maksimize eder.'
    },
    {
        id: 2,
        top: '68%',
        left: '48%',
        title: 'Aksiyon Alanı (Conversion Zone)',
        content: 'Arama çubuğu ve CTA butonları, görsel hiyerarşide ikinci sırada yer alır. Koyu zemin üzerindeki parlak mavi "Bul" butonu, Hick Yasası\'nı hafifleterek net bir sonraki adım sunar.'
    }
];

type ViewMode = 'standard' | 'xray' | 'heatmap' | 'analysis';

const AnatomyViewport = ({ imageSrc, hotspots, heatmapSpots, analysisShapes }: AnatomyViewportProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('standard');

    // Use passed hotspots or default
    const activeHotspots = hotspots || defaultHotspots;

    const toggleMode = (mode: ViewMode) => {
        setViewMode(current => current === mode ? 'standard' : mode);
    };

    return (
        <div className="w-full mx-auto my-6">
            {/* --- VIEWPORT CONTAINER (Ana Çerçeve) --- */}
            {/* Koyu, teknik çerçeve, ince grid arkaplanı ve border detayları */}
            <div className="relative bg-gray-950 p-6 rounded-xl border border-gray-800/80 shadow-2xl overflow-hidden group/viewport select-none">

                {/* Arkaplan Teknik Grid Efekti */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

                {/* --- Fütüristik Köşe Çizgileri (Crosshairs/Corners) --- */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-lg pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-lg pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg pointer-events-none"></div>

                {/* Çerçeve Başlığı ve Kontrol Paneli */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 relative z-20 gap-4">
                    <div className="flex items-center space-x-2 text-cyan-400/80 font-mono text-sm tracking-widest uppercase">
                        <Activity size={16} className="animate-pulse" />
                        <span>Nöro-Mühendislik Analiz Görünümü v1.2</span>
                    </div>

                    {/* --- KONTROL BUTONLARI --- */}
                    <div className="flex flex-row items-center gap-3 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar py-1">
                        <button
                            onClick={() => toggleMode('xray')}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border text-xs font-semibold transition-all duration-300 ${viewMode === 'xray'
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                                }`}
                        >
                            {viewMode === 'xray' ? <ScanEye size={14} /> : <EyeOff size={14} />}
                            <span>X-Ray</span>
                        </button>

                        <button
                            onClick={() => toggleMode('heatmap')}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border text-xs font-semibold transition-all duration-300 ${viewMode === 'heatmap'
                                ? 'bg-orange-500/20 border-orange-400 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                                }`}
                        >
                            <Zap size={14} />
                            <span>Isı Haritası</span>
                        </button>

                        <button
                            onClick={() => toggleMode('analysis')}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border text-xs font-semibold transition-all duration-300 ${viewMode === 'analysis'
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                                }`}
                        >
                            <Layers size={14} />
                            <span>Analiz</span>
                        </button>
                    </div>
                </div>


                {/* --- GÖRSEL KONTEYNERİ --- */}
                <div className="relative rounded-lg overflow-hidden border border-gray-800/50 bg-gray-900/50">
                    {/* Cetvel İşaretleri (Ruler Marks - Dekoratif) */}
                    <div className="absolute left-0 top-0 h-full w-4 border-r border-gray-800/30 z-10 flex flex-col justify-between py-2 pointer-events-none opacity-50">
                        {[...Array(10)].map((_, i) => <div key={i} className="w-2 h-px bg-gray-600"></div>)}
                    </div>
                    <div className="absolute left-0 top-0 w-full h-4 border-b border-gray-800/30 z-10 flex justify-between px-2 pointer-events-none opacity-50">
                        {[...Array(10)].map((_, i) => <div key={i} className="h-2 w-px bg-gray-600"></div>)}
                    </div>


                    {/* --- ANA GÖRSEL VE FİLTRE UYGULAMASI --- */}
                    <img
                        src={imageSrc}
                        alt="Analiz Edilen Arayüz"
                        className={`w-full h-auto object-cover transform transition-all duration-700 ease-in-out will-change-transform ${viewMode === 'xray'
                            ? 'grayscale-[100%] contrast-[150%] brightness-[80%] scale-[0.98]' // X-Ray Aktif
                            : viewMode === 'heatmap'
                                ? 'grayscale-[30%] brightness-[60%] blur-[1px]' // Heatmap Aktif (arkaplanı karart)
                                : 'grayscale-0 contrast-100 brightness-100 scale-100' // Normal Mod
                            }`}
                    />

                    {/* --- HEATMAP LAYERS --- */}
                    <AnimatePresence>
                        {viewMode === 'heatmap' && heatmapSpots && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                            >
                                {heatmapSpots.map((spot) => (
                                    <motion.div
                                        key={spot.id}
                                        className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-60"
                                        style={{
                                            top: spot.top,
                                            left: spot.left,
                                            width: spot.size,
                                            height: spot.size,
                                            background: `radial-gradient(circle, 
                                                ${spot.color || 'rgba(255, 0, 0, 0.8)'} 0%, 
                                                rgba(255, 200, 0, 0.6) 30%, 
                                                rgba(0, 255, 100, 0.3) 60%, 
                                                transparent 100%)`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        animate={{
                                            scale: [0.9, 1.1, 0.9],
                                            opacity: [spot.intensity * 0.5, spot.intensity, spot.intensity * 0.5]
                                        }}
                                        transition={{
                                            duration: 4 + Math.random() * 2,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- ANALYSIS SHAPES LAYER --- */}
                    <AnimatePresence>
                        {viewMode === 'analysis' && analysisShapes && (
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                <svg className="w-full h-full">
                                    {analysisShapes.map((shape, i) => (
                                        <g key={shape.id}>
                                            <motion.rect
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                                x={shape.left}
                                                y={shape.top}
                                                width={shape.width}
                                                height={shape.height}
                                                rx="4"
                                                fill="transparent"
                                                stroke={shape.color || "#10b981"} // default emerald
                                                strokeWidth="2"
                                                strokeDasharray="4 2"
                                            />
                                            {/* Label Tag */}
                                            <foreignObject x={shape.left} y={parseFloat(shape.top) > 10 ? `calc(${shape.top} - 24px)` : `calc(${shape.top} + ${shape.height} + 8px)`} width="200" height="30">
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.5 + (i * 0.2) }}
                                                    className="inline-block px-2 py-1 bg-gray-900/90 border border-emerald-500/50 rounded text-[10px] font-mono text-emerald-400 shadow-lg backdrop-blur-sm"
                                                >
                                                    {shape.label}
                                                </motion.div>
                                            </foreignObject>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        )}
                    </AnimatePresence>


                    {/* --- ETKİLEŞİMLİ HOTSPOT KATMANI (Sadece Standard veya X-Ray modunda gösterelim ki karışmasın) --- */}
                    {(viewMode === 'standard' || viewMode === 'xray') && (
                        <div className="absolute inset-0 z-30 pointer-events-none">
                            {activeHotspots.map((spot) => (
                                <div
                                    key={spot.id}
                                    className="absolute group pointer-events-auto"
                                    style={{ top: spot.top, left: spot.left, transform: 'translate(-50%, -50%)' }}
                                >
                                    {/* Yanıp Sönen Nokta Efekti */}
                                    <div className="relative flex items-center justify-center w-8 h-8">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20 animate-ping-slow"></span>
                                        <span className="absolute inline-flex h-4 w-4 rounded-full bg-cyan-500/50 animate-pulse"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300 items-center justify-center shadow-[0_0_10px_#06b6d4]">
                                            <Crosshair size={8} className="text-cyan-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </span>
                                    </div>

                                    {/* --- TOOLTIP (Analiz Balonu) --- */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 hidden group-hover:block z-40">
                                        <div className="w-72 bg-gray-950/95 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.15)] p-4 text-left">
                                            <h4 className="flex items-center text-cyan-300 font-mono text-xs font-bold mb-2 uppercase tracking-wider">
                                                <Activity size={12} className="mr-2 inline text-cyan-500" />
                                                {spot.title}
                                            </h4>
                                            <p className="text-gray-300 text-sm leading-relaxed font-sans">
                                                <span className="text-cyan-500/70 font-mono mr-1">&gt;&gt;</span>
                                                {spot.content}
                                            </p>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-950/95"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* X-Ray Modu Overlay (Tarama Çizgileri) - Sadece X-Ray açıkken görünür */}
                    <div className={`absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_4px] z-20 transition-opacity duration-500 ${viewMode === 'xray' ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
            </div>
        </div>
    );
};

export default AnatomyViewport;
