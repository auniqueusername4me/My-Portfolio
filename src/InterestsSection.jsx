import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Play, Pause, Music } from "lucide-react";

export const TRACKS = [
  {
    id: "long-long-time",
    title: "It's Been A Long Long Time",
    artist: "Harry James & His Orchestra",
    src: "/audio/long-long-time.m4a",
    cover: "/audio/long-long-time.webp",
    startTime: 12
  },
  {
    id: "hit-the-road-jack",
    title: "Hit the road jack",
    artist: "Ray Charles",
    src: "/audio/hit-the-road-jack.m4a",
    cover: "/audio/hit-the-road-jack.jpg",
    startTime: 15
  },
  {
    id: "beyond-the-sea",
    title: "Beyond the Sea",
    artist: "Bobby Darin",
    src: "/audio/beyond-the-sea.m4a",
    cover: "/audio/beyond-the-sea.jpg",
    startTime: 32
  },
  {
    id: "million-dollar-baby",
    title: "Million Dollar Baby",
    artist: "Tommy Richman",
    src: "/audio/million-dollar-baby.m4a",
    cover: "/audio/million-dollar-baby.webp",
    startTime: 10
  }
];

export default function InterestsSection({ onClose, activeTrack, setActiveTrack, isPlaying, setIsPlaying, audioRef }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const vinylRef = useRef(null);
  const spinTweenRef = useRef(null);
  const coverImgRef = useRef(null);

  useEffect(() => {
    // Animate in: Fade overlay
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    // Animate in: Float up and scale container
    gsap.fromTo(
      containerRef.current,
      { y: 60, scale: 0.9, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.1 }
    );
    
    // Create spin tween
    spinTweenRef.current = gsap.to(vinylRef.current, {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: "none",
      paused: !isPlaying
    });

    return () => {
      if (spinTweenRef.current) spinTweenRef.current.kill();
    };
  }, []);

  // Handle Playback Spin Animation State
  useEffect(() => {
    if (spinTweenRef.current) {
      if (isPlaying) {
        spinTweenRef.current.play();
      } else {
        spinTweenRef.current.pause();
      }
    }
  }, [isPlaying, activeTrack]);

  const handleTrackChange = (track) => {
    if (activeTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      if (coverImgRef.current) {
        gsap.fromTo(coverImgRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
      }
      setActiveTrack(track);
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    // Keep audio playing in background!
    // Animate out
    gsap.to(containerRef.current, { y: 30, scale: 0.95, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", delay: 0.1, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#2E2019]/70 backdrop-blur-md">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl bg-[#FFEED6] rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden border-2 border-[#2E2019]/20"
      >
        {/* Close Button: Beige & Brown 3D style */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 px-5 py-2 flex items-center rounded-xl bg-[#FFEED6] text-[#2E2019] z-50 font-bold border-b-4 border-r-4 border-[#2E2019] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 outline-none shadow-md transition-all"
          aria-label="Close"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          <span className="mr-2 text-lg">Close</span>
          <X className="w-5 h-5 text-[#2E2019]" />
        </button>

        {/* Unified Top Heading */}
        <div className="w-full text-center py-6 bg-[#2E2019] border-b-4 border-[#E2725B]">
            <h1 className="text-2xl sm:text-4xl font-black text-[#FFEED6] tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Music (A curated soundscape)
            </h1>
        </div>

        <div className="flex flex-col md:flex-row min-h-[550px]">
          {/* Left Column: Track List & Credits */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col border-b md:border-b-0 md:border-r border-[#2E2019]/10 relative z-10 bg-[#fdf5e6]">
            
            <div className="flex-grow">
              <div className="space-y-4">
                {TRACKS.map((track) => {
                  const isActive = activeTrack.id === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => handleTrackChange(track)}
                      className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 border-2 text-left group ${
                        isActive 
                          ? "bg-[#2E2019] border-[#2E2019] shadow-lg transform scale-[1.02]" 
                          : "bg-white border-transparent hover:border-[#E2725B]/30 hover:bg-white shadow-sm"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 shrink-0 transition-colors ${
                        isActive ? "bg-[#E2725B]" : "bg-[#FFEED6] group-hover:bg-[#E2725B]/20"
                      }`}>
                        {isActive && isPlaying ? (
                          <Pause className={`w-6 h-6 ${isActive ? "text-[#FFEED6]" : "text-[#2E2019]"}`} />
                        ) : (
                          <Play className={`w-6 h-6 ml-1 ${isActive ? "text-[#FFEED6]" : "text-[#2E2019]"}`} />
                        )}
                      </div>
                      
                      <div className="flex flex-col overflow-hidden">
                        <span className={`text-lg font-bold truncate ${isActive ? "text-[#FFEED6]" : "text-[#2E2019]"}`} style={{ fontFamily: "'Fredoka', sans-serif" }}>
                          {track.title}
                        </span>
                        <span className={`text-sm font-semibold truncate ${isActive ? "text-[#FFEED6]/70" : "text-[#2E2019]/60"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {track.artist}
                        </span>
                      </div>
                      
                      {isActive && isPlaying && (
                        <div className="ml-auto flex items-end justify-center space-x-1 h-6">
                          <div className="w-1.5 bg-[#E2725B] rounded-t-sm animate-bounce" style={{ height: "40%", animationDuration: "0.5s" }}></div>
                          <div className="w-1.5 bg-[#E2725B] rounded-t-sm animate-bounce" style={{ height: "100%", animationDuration: "0.7s" }}></div>
                          <div className="w-1.5 bg-[#E2725B] rounded-t-sm animate-bounce" style={{ height: "70%", animationDuration: "0.6s" }}></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Credits & Fair Use */}
            <div className="mt-8 pt-6 border-t border-[#2E2019]/10">
              <div className="flex items-start text-xs sm:text-sm font-semibold text-[#2E2019]/60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Music className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                <p className="leading-tight">
                  <strong className="text-[#2E2019]/80">Fair Use Disclaimer:</strong> All music and album artwork belong to their respective original owners and labels. These short clips are used strictly for non-commercial, demonstrative purposes within this portfolio. No copyright infringement is intended.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Songs Heading & Animated Vinyl Player */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden bg-[#FFEED6]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#2E2019 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-[#2E2019] tracking-wider mb-10 z-10 text-center" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Songs that I like
            </h2>
            
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* The Vinyl Record (Picture Disc) */}
              <div 
                ref={vinylRef}
                className="absolute inset-0 rounded-full shadow-[0_20px_40px_rgba(46,32,25,0.5)] flex items-center justify-center border-[6px] border-[#111] overflow-hidden"
              >
                {/* Full Album Cover */}
                <img 
                  ref={coverImgRef}
                  src={activeTrack.cover} 
                  alt={activeTrack.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Grooves and texture over image */}
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none rounded-full"></div>
                <div className="absolute inset-4 rounded-full border border-black/30 pointer-events-none"></div>
                <div className="absolute inset-10 rounded-full border border-white/20 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-16 rounded-full border border-black/30 pointer-events-none"></div>
                <div className="absolute inset-24 rounded-full border border-white/10 mix-blend-overlay pointer-events-none"></div>
                
                {/* Spindle hole */}
                <div className="w-5 h-5 rounded-full bg-[#FFEED6] border-2 border-[#111] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] z-10 relative"></div>
              </div>

              {/* Tonearm */}
              <div 
                className="absolute top-0 -right-6 sm:-right-10 w-12 sm:w-16 h-48 sm:h-56 pointer-events-none origin-[50%_15px] transition-transform duration-700 ease-in-out z-20"
                style={{ transform: isPlaying ? "rotate(15deg)" : "rotate(-10deg)" }}
              >
                {/* Pivot */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-[#2E2019] absolute top-0 left-1/2 -translate-x-1/2 shadow-xl"></div>
                {/* Arm Base */}
                <div className="w-4 h-12 bg-[#222] absolute top-8 left-1/2 -translate-x-1/2 rounded-full"></div>
                {/* Long Arm */}
                <div className="w-2.5 h-36 bg-gradient-to-b from-gray-200 to-gray-400 absolute top-16 left-1/2 -translate-x-1/2 shadow-md"></div>
                {/* Headshell */}
                <div className="w-7 h-12 bg-[#2E2019] absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md shadow-2xl transform rotate-12 border-2 border-gray-600">
                    <div className="w-1 h-3 bg-red-500 absolute -left-1 top-1/2 -translate-y-1/2 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <p className="mt-12 text-lg sm:text-xl font-bold text-[#E2725B] italic text-center z-10" style={{ fontFamily: "'Caveat', cursive" }}>
              "Building beyond the screen."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
