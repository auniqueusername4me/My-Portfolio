// Import React hooks for managing state, effects, and DOM element references
import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
// Import the video intro component
import VideoIntro from "./VideoIntro";
// Import React core library
// Import GSAP library for smooth animations
import gsap from "gsap";
// Import ScrollTrigger plugin from GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ...
gsap.registerPlugin(ScrollTrigger);
import { Observer } from "gsap/Observer";
// Import GSAP's official React hook for safe lifecycle management
import { useGSAP } from "@gsap/react";
// Import Lucide icons for Glass Navigation
import { Home, User, FolderGit2, Briefcase, Mail } from "lucide-react";
import CaseStudiesSection from "./CaseStudiesSection";
import AboutMeSection from "./AboutMeSection";
import Footer from "./Footer";

import InterestsSection, { TRACKS } from "./InterestsSection";

// Register ScrollTrigger and Observer plugins with GSAP engine
gsap.registerPlugin(ScrollTrigger, Observer);

// Import icon image assets from local directory paths
import Comments from "./Icons/chat.png";
import Github from "./Icons/github.png";
import Linkedin from "./Icons/linkedin.png";
import List from "./Icons/list.png";
import Vinyl1 from "./Icons/vin.png";
import About from "./Icons/information.png";
import InstagramPng from "./Icons/instagram.png";
import DuckPng from "./Icons/duck.png";
import PlantPng from "./Icons/plant.png";
import TerminalPng from "./Icons/terminal.png";
import CurvedArrow from "./Svgs/curvedarrow.svg";
import Uppercurved from "./Svgs/uppercurved.svg";
import Rightcureved from "./Svgs/rightcurved.svg";
import Rotatedcureved from "./Svgs/rotatedcurved.svg";

const playQuackSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "triangle";

    osc1.frequency.setValueAtTime(320, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);

    osc2.frequency.setValueAtTime(350, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.2);
    osc2.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn("Web Audio API blocked or not supported", e);
  }
};

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [isScattered, setIsScattered] = useState(false);
  const [isTidied, setIsTidied] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isTabActive, setIsTabActive] = useState(!document.hidden && document.hasFocus());
  const [activeNavTab, setActiveNavTab] = useState("home");

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalCode, setTerminalCode] = useState(
    `import shutil\nshutil.rmtree("C:\\\\Windows\\\\System32", ignore_errors=True)`
  );

  const containerRef = useRef(null);
  const clickMeRef = useRef(null);
  const instaBoxRef = useRef(null);
  const instaTextBoxRef = useRef(null);
  const instaImgRef = useRef(null);
  const instaTooltipRef = useRef(null);
  const nameBadgeRef = useRef(null);
  const mainTitleRef = useRef(null);
  const subHeadingRef = useRef(null);
  const vinylArrowRef = useRef(null);
  const resumeArrowRef = useRef(null);
  const contactArrowRef = useRef(null);
  const githubBoxRef = useRef(null);
  const linkedinArrowRef = useRef(null);
  const aboutBoxRef = useRef(null);
  const glassNavRef = useRef(null);
  const aboutNavRef = useRef(null);
  const caseStudiesNavRef = useRef(null);
  const resumeNavRef = useRef(null);
  const contactNavRef = useRef(null);
  const centerBioRef = useRef(null);
  const bioHasAnimatedRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const wrappersRef = useRef([]);
  const imgRefs = useRef([]);
  const tooltipsRef = useRef([]);
  const vinylTweensRef = useRef({});
  const scatterTargets = useRef([]);

  // Refs that mirror state for use inside long-lived event listeners (avoids stale closures)
  const isTidiedRef = useRef(false);
  const isScatteredRef = useRef(false);

  const iconData = [
    { src: Comments, label: "Connect!!", isContact: true, link: null },
    { src: Github, label: "GitHub", isGithub: true, link: "https://github.com/auniqueusername4me" },
    { src: Linkedin, label: "LinkedIn", isLinkedin: true, link: "https://www.linkedin.com/in/ayush-pachouri-a67427398" },
    { src: List, label: "CV", isResume: true, link: null },
    { src: Vinyl1, label: "Music", isVinyl: true, link: null },
    { src: About, label: "About Me", isAbout: true, link: null },
    { src: DuckPng, label: "Duck", isDuck: true, link: null },
    { src: PlantPng, label: "Plant", isPlant: true, link: null },
    { src: TerminalPng, label: "Terminal", isTerminal: true, link: null },
  ];

  const headlineText = "This portfolio took significantly longer than I'd ever admit in an interview.";

  // Detect mobile
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [showMobileDisclaimer, setShowMobileDisclaimer] = useState(false);
  const disclaimerRef = useRef(null);
  const aboutMeRef = useRef(null);
  // heroReady: gates the icon fade-in + Click Me animation.
  // Desktop: fires immediately after video. Mobile: fires after disclaimer is dismissed.
  const [heroReady, setHeroReady] = useState(false);
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      if (isPlaying) {
        if (audio.currentTime === 0 && activeTrack.startTime) {
          audio.currentTime = activeTrack.startTime;
        }
        audio.play().catch(e => {
          console.warn("Playback failed:", e);
          setIsPlaying(false);
        });
      } else {
        audio.pause();
      }
    };

    if (audio.readyState >= 1) {
      tryPlay();
    }

    const onLoadedMetadata = () => {
      tryPlay();
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [isPlaying, activeTrack]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll listener to hide heading/subheading past the hero section
  useEffect(() => {
    const handleScrollHiding = () => {
      const isPastHero = window.scrollY > 150;
      const titleContainer = document.getElementById("main-title-container");
      if (titleContainer) {
        if (isPastHero) {
          gsap.to(titleContainer, { opacity: 0, pointerEvents: "none", duration: 0.25, overwrite: "auto" });
        } else if (!isTidiedRef.current) {
          gsap.to(titleContainer, { opacity: 1, pointerEvents: "auto", duration: 0.25, overwrite: "auto" });
        }
      }
    };
    window.addEventListener("scroll", handleScrollHiding, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollHiding);
  }, []);

  // Keep refs in sync with state so event listeners always read the latest values
  useEffect(() => { isTidiedRef.current = isTidied; }, [isTidied]);
  useEffect(() => { isScatteredRef.current = isScattered; }, [isScattered]);

  useGSAP(() => {
    if (showMobileDisclaimer && disclaimerRef.current) {
      gsap.fromTo(disclaimerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });
    }
  }, [showMobileDisclaimer]);

  // --- CENTRALIZED SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isTidied) {
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    } else {
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    };
  }, [isTidied]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hasFocus() && document.hidden ? false : true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isTidied) {
      handleTidyFlanks(true);
    } else if (isScattered) {
      updateScatterPositions();
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalOpen]);

  const addToWrappersRef = (el) => {
    if (el && !wrappersRef.current.includes(el)) wrappersRef.current.push(el);
  };
  const addToImgRefs = (el) => {
    if (el && !imgRefs.current.includes(el)) imgRefs.current.push(el);
  };
  const addToTooltipsRef = (el) => {
    if (el && !tooltipsRef.current.includes(el)) tooltipsRef.current.push(el);
  };

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleInstaMouseEnter = contextSafe(() => {
    if (instaBoxRef.current) gsap.to(instaBoxRef.current, { scale: 1.08, rotation: -6, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    if (instaTooltipRef.current) gsap.to(instaTooltipRef.current, { opacity: 1, scale: 1, y: -12, duration: 0.3, ease: "back.out(1.7)", overwrite: "auto" });
  });

  const handleInstaMouseLeave = contextSafe(() => {
    if (instaBoxRef.current) gsap.to(instaBoxRef.current, { scale: 1.0, rotation: 0, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    if (instaTooltipRef.current) gsap.to(instaTooltipRef.current, { opacity: 0, scale: 0, y: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" });
  });

  useGSAP(() => {
    if (heroReady && wrappersRef.current.length > 0) {
      gsap.fromTo(wrappersRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" });
      if (clickMeRef.current && !isScattered) {
        gsap.fromTo(clickMeRef.current, { opacity: 0, scale: 0.5, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.5, ease: "back.out(1.7)", overwrite: "auto" });
      }

      // Scroll observer to update active nav tab
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: 300,
        onEnter: () => setActiveNavTab("home"),
        onEnterBack: () => setActiveNavTab("home")
      });

      ScrollTrigger.create({
        trigger: "#case-studies-section",
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveNavTab("case-studies"),
        onEnterBack: () => setActiveNavTab("case-studies")
      });

      ScrollTrigger.create({
        trigger: "#about-me-section",
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveNavTab("about"),
        onEnterBack: () => setActiveNavTab("about")
      });
    }
  }, [heroReady, isScattered]);

  const handleContainerMouseEnter = contextSafe(() => {
    if (isScattered || isTidied) return;
    const initialFanOffsets = [
      { x: -50, rotation: -30 }, { x: -38, rotation: 18 }, { x: -26, rotation: -22 },
      { x: -14, rotation: 12 }, { x: -2, rotation: -16 }, { x: 10, rotation: 14 },
      { x: 22, rotation: -20 }, { x: 34, rotation: 10 }, { x: 46, rotation: -25 },
    ];
    wrappersRef.current.forEach((wrapper, index) => {
      if (initialFanOffsets[index] && wrapper) {
        gsap.to(wrapper, { x: initialFanOffsets[index].x, y: 0, rotation: initialFanOffsets[index].rotation, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });
  });

  const handleContainerMouseLeave = contextSafe(() => {
    if (isScattered || isTidied) return;
    wrappersRef.current.forEach((wrapper) => {
      if (wrapper) gsap.to(wrapper, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
  });

  const handleIconMouseEnter = contextSafe((e, isVinyl, index) => {
    if (!isScattered) return;
    const wrapper = wrappersRef.current[index];
    const imgEl = imgRefs.current[index];
    const tooltip = tooltipsRef.current[index];
    if (wrapper) gsap.to(wrapper, { scale: 1.12, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    if (tooltip) gsap.to(tooltip, { opacity: 1, scale: 1, y: -20, duration: 0.3, ease: "back.out(1.7)", overwrite: "auto" });
    if (isVinyl && imgEl) {
      if (vinylTweensRef.current[index]) vinylTweensRef.current[index].kill();
      vinylTweensRef.current[index] = gsap.to(imgEl, { rotation: "+=360", duration: 2, ease: "none", repeat: -1 });
    }
  });

  const handleIconMouseLeave = contextSafe((e, isVinyl, index) => {
    if (!isScattered) return;
    const wrapper = wrappersRef.current[index];
    const tooltip = tooltipsRef.current[index];
    if (wrapper) gsap.to(wrapper, { scale: 1.0, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    if (tooltip) gsap.to(tooltip, { opacity: 0, scale: 0, y: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" });
    if (isVinyl && vinylTweensRef.current[index]) {
      vinylTweensRef.current[index].kill();
      delete vinylTweensRef.current[index];
    }
  });

  const updateScatterPositions = contextSafe(() => {
    if (!isScattered || isTidied) return;
    const width = window.innerWidth;
    const isMobile = width < 640;

    if (isMobile) {
      const edge = width / 2;
      scatterTargets.current = [
        { x: -(edge - 32), y: -210, rotation: -12 },
        { x:  (edge - 32), y: -150, rotation:  10 },
        { x: -(edge - 32), y:  -50, rotation:  -8 },
        { x:  (edge - 32), y:   40, rotation:  12 },
        { x: -(edge - 32), y:  160, rotation:  15 },
        { x:  (edge - 32), y:  -90, rotation:  -9 },
        { x: -(edge - 32), y:  -80, rotation:   8 },
        { x:  (edge - 32), y:  200, rotation: -14 },
        { x: -(edge - 32), y:  280, rotation: -10 },
      ];
    } else {
      const xDistStd = width * 0.28, xDistFar = width * 0.35, xDistEdge = width * 0.40, xDistRC = width * 0.42;
      scatterTargets.current = [
        { x: -xDistFar, y: -220, rotation: -25 }, { x: -xDistEdge - 70, y: 0, rotation: -12 }, { x: -xDistStd + 80, y: 250, rotation: 18 },
        { x: 340, y: -240, rotation: -18 }, { x: xDistRC, y: 180, rotation: 15 }, { x: 30, y: 250, rotation: -10 },
        { x: -xDistStd + 800, y: 110, rotation: 14 }, { x: -xDistStd - 140, y: 320, rotation: -20 }, { x: xDistStd + 120, y: -35, rotation: -15 },
      ];
    }

    wrappersRef.current.forEach((wrapper, index) => {
      const target = scatterTargets.current[index];
      if (target && wrapper) gsap.to(wrapper, { x: target.x, y: target.y, rotation: target.rotation, scale: 1.0, opacity: 1, duration: 0.8, ease: "back.out(1.4)", overwrite: true });
    });
  });

  const handleScatterOnce = contextSafe(() => {
    if (isScattered || isTidied) return;
    setIsScattered(true);
    if (clickMeRef.current) {
      gsap.killTweensOf(clickMeRef.current);
      gsap.to(clickMeRef.current, { opacity: 0, scale: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" });
    }
    if (instaBoxRef.current) gsap.fromTo(instaBoxRef.current, { opacity: 0, y: -15, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.1, ease: "back.out(1.6)" });
    if (nameBadgeRef.current) gsap.fromTo(nameBadgeRef.current, { opacity: 0, y: -20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.6)" });

    if (mainTitleRef.current) {
      const charSpans = mainTitleRef.current.querySelectorAll(".scroll-char");
      gsap.fromTo(mainTitleRef.current, { opacity: 0, y: -30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.4)" });
      gsap.from(charSpans, { x: 100, opacity: 0, duration: 0.7, ease: "power4.out", stagger: 0.02, delay: 0.5 });
      if (subHeadingRef.current) {
        gsap.fromTo(subHeadingRef.current, { opacity: 0, y: -40, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.6, ease: "back.out(1.8)" });
      }
    }

    const animateBadge = (ref) => {
      if (ref.current) gsap.fromTo(ref.current, { opacity: 0, scale: 0.8, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.6, ease: "back.out(1.5)" });
    };

    animateBadge(vinylArrowRef); animateBadge(resumeArrowRef); animateBadge(contactArrowRef);
    animateBadge(githubBoxRef); animateBadge(linkedinArrowRef); animateBadge(aboutBoxRef);

    const width = window.innerWidth;
    const isMobile = width < 640;

    if (isMobile) {
      // Icon is w-16 = 64px wide, half = 32px.
      // Place icon CENTER at screen edge → exactly half visible, half off-screen.
      const edge = width / 2; // distance from page center to screen edge
      scatterTargets.current = [
        { x: -(edge - 32), y: -210, rotation: -12 },  // left edge, top
        { x:  (edge - 32), y: -150, rotation:  10 },  // right edge, top
        { x: -(edge - 32), y:  -50, rotation:  -8 },  // left edge, mid-upper
        { x:  (edge - 32), y:   40, rotation:  12 },  // right edge, mid
        { x: -(edge - 32), y:  160, rotation:  15 },  // left edge, mid-lower
        { x:  (edge - 32), y:  -90, rotation:  -9 },  // right edge, upper-mid
        { x: -(edge - 32), y:  -80, rotation:   8 },  // left edge, upper
        { x:  (edge - 32), y:  200, rotation: -14 },  // right edge, bottom
        { x: -(edge - 32), y:  280, rotation: -10 },  // left edge, bottom
      ];
    } else {
      const xDistStd = width * 0.28, xDistFar = width * 0.35, xDistEdge = width * 0.40, xDistRC = width * 0.42;
      scatterTargets.current = [
        { x: -xDistFar, y: -220, rotation: -25 }, { x: -xDistEdge - 70, y: 0, rotation: -12 }, { x: -xDistStd + 80, y: 250, rotation: 18 },
        { x: 340, y: -240, rotation: -18 }, { x: xDistRC, y: 180, rotation: 15 }, { x: 30, y: 250, rotation: -10 },
        { x: -xDistStd + 800, y: 110, rotation: 14 }, { x: -xDistStd - 140, y: 320, rotation: -20 }, { x: xDistStd + 120, y: -35, rotation: -15 },
      ];
    }

    wrappersRef.current.forEach((wrapper, index) => {
      const target = scatterTargets.current[index];
      if (target && wrapper) gsap.to(wrapper, { x: target.x, y: target.y, rotation: target.rotation, scale: 1.0, opacity: 1, duration: 0.8, ease: "back.out(1.4)", overwrite: true });
    });
  });

  const handleTidyFlanks = contextSafe((shouldTidy) => {
    setIsTidied(shouldTidy);

    const width = window.innerWidth;
    const isMobile = width < 640;
    const leftX = isMobile ? -width * 0.35 : -width * 0.38;
    const rightX = isMobile ? width * 0.35 : width * 0.38;
    const ySpacing = isMobile ? 120 : 155;

    const edge = width / 2; // distance from screen center to edge

    const tidyTargets = isMobile ? [
      // Mobile: icon center at screen edge → exactly half visible, half off-screen
      { x:  (edge - 32), y: -220, rotation: -7  },
      { x: -(edge - 32), y: -140, rotation:  4  },
      { x: -(edge - 32), y:  -20, rotation: -5  },
      { x:  (edge - 32), y:  -80, rotation:  7  },
      { x:  (edge - 32), y:   60, rotation: -6  },
      { x:  (edge - 32), y:  170, rotation:  5  },
      { x: -(edge - 32), y:  100, rotation:  4  },
      { x: -(edge - 32), y:  220, rotation: -7  },
      { x:  (edge - 32), y:  280, rotation: -8  },
    ] : [
      { x: rightX - 50, y: -ySpacing * 1.9, rotation: -7 }, { x: leftX, y: -ySpacing * 0.8, rotation: 4 }, { x: leftX - 8, y: 0, rotation: -5 },
      { x: rightX + 15, y: -ySpacing * 1.2, rotation: 7 }, { x: rightX - 10, y: -ySpacing * 0.4, rotation: -6 }, { x: rightX + 8, y: ySpacing * 0.4, rotation: 5 },
      { x: leftX + 16, y: ySpacing * 0.8, rotation: 4 }, { x: leftX - 14, y: ySpacing * 1.6, rotation: -7 }, { x: rightX - 12, y: ySpacing * 1.2, rotation: -8 },
    ];

    const getNavbarScale = () => Math.min(1.2, (window.innerWidth - 56) / 168);
    const noteRefs = [vinylArrowRef, resumeArrowRef, contactArrowRef, githubBoxRef, linkedinArrowRef, aboutBoxRef, instaTextBoxRef];

    if (shouldTidy) {
      if (mainTitleRef.current) {
        gsap.killTweensOf(mainTitleRef.current);
        const charSpans = mainTitleRef.current.querySelectorAll(".scroll-char");
        if (charSpans.length) gsap.killTweensOf(charSpans);
      }
      if (nameBadgeRef.current) gsap.killTweensOf(nameBadgeRef.current);
      if (subHeadingRef.current) gsap.killTweensOf(subHeadingRef.current);
      noteRefs.forEach((ref) => { if (ref.current) gsap.killTweensOf(ref.current); });

      if (mainTitleRef.current) gsap.to(mainTitleRef.current, { opacity: 0, y: -80, scale: 0.9, duration: 0.3, ease: "power2.in", overwrite: true });
      if (nameBadgeRef.current) gsap.to(nameBadgeRef.current, { opacity: 0, y: -80, scale: 0.9, duration: 0.3, ease: "power2.in", overwrite: true });
      if (subHeadingRef.current) gsap.to(subHeadingRef.current, { opacity: 0, y: -80, scale: 0.9, duration: 0.3, ease: "power2.in", overwrite: true });
      // Hide the whole title container so it can't bleed through z-stacking
      const titleContainer = document.getElementById('main-title-container');
      if (titleContainer) gsap.to(titleContainer, { autoAlpha: 0, duration: 0.3, overwrite: true });
      if (centerBioRef.current) gsap.to(centerBioRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3, overwrite: true });
      noteRefs.forEach((ref) => { if (ref.current) gsap.to(ref.current, { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.inOut", overwrite: true }); });

      wrappersRef.current.forEach((wrapper, index) => {
        if (tidyTargets[index] && wrapper) gsap.to(wrapper, { x: tidyTargets[index].x, y: tidyTargets[index].y, rotation: tidyTargets[index].rotation, scale: 0.9, opacity: 1, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
      });

      if (glassNavRef.current) gsap.to(glassNavRef.current, { scale: getNavbarScale(), transformOrigin: "top left", duration: 0.6, ease: "power2.inOut" });

      gsap.to([aboutNavRef.current, caseStudiesNavRef.current], { x: 0, y: 0, scale: 1, opacity: 1, pointerEvents: "auto", duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" });
      gsap.to([resumeNavRef.current, contactNavRef.current], { x: 0, y: 0, scale: 1, opacity: 1, pointerEvents: "auto", duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" });

      if (centerBioRef.current) {
        gsap.to(centerBioRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto", delay: 0.25 });
        const heading = centerBioRef.current.querySelector("h1"), subheading = centerBioRef.current.querySelector("p"), words = centerBioRef.current.querySelectorAll(".center-bio-word");
        if (!bioHasAnimatedRef.current) {
          gsap.fromTo(heading, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.25, ease: "power2.out", overwrite: "auto" });
          gsap.fromTo(subheading, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.35, ease: "power2.out", overwrite: "auto" });
          gsap.fromTo(words, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.01, ease: "power2.out", delay: 0.4, overwrite: "auto" });
          bioHasAnimatedRef.current = true;
        } else {
          gsap.set([heading, subheading, words], { opacity: 1, y: 0, delay: 0.25 });
        }
      }
    } else {
      if (centerBioRef.current) {
        gsap.to(centerBioRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in", overwrite: "auto" });
        if (!bioHasAnimatedRef.current) gsap.set(centerBioRef.current.querySelectorAll(".center-bio-word"), { opacity: 0, y: 10 });
      }

      const headerDelay = 0.25;
      // Restore title container visibility
      const titleContainer = document.getElementById('main-title-container');
      if (titleContainer) gsap.to(titleContainer, { autoAlpha: 1, duration: 0.3, delay: headerDelay, overwrite: true });
      if (mainTitleRef.current) gsap.to(mainTitleRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: headerDelay, ease: "power2.out", overwrite: "auto" });
      if (nameBadgeRef.current) gsap.to(nameBadgeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: headerDelay, ease: "power2.out", overwrite: "auto" });
      if (subHeadingRef.current) gsap.to(subHeadingRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: headerDelay + 0.35, ease: "back.out(1.5)", overwrite: "auto" });
      noteRefs.forEach((ref) => { if (ref.current) gsap.to(ref.current, { opacity: 1, scale: 1, duration: 0.4, delay: headerDelay, ease: "power2.out", overwrite: "auto" }); });

      wrappersRef.current.forEach((wrapper, index) => {
        if (scatterTargets.current[index] && wrapper) gsap.to(wrapper, { x: scatterTargets.current[index].x, y: scatterTargets.current[index].y, rotation: scatterTargets.current[index].rotation, scale: 1.0, opacity: 1, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
      });

      if (glassNavRef.current) gsap.to(glassNavRef.current, { scale: 1.0, transformOrigin: "top left", duration: 0.6, ease: "power2.inOut" });
      gsap.to(aboutNavRef.current, { x: -60, y: 0, scale: 0, opacity: 0, pointerEvents: "none", duration: 0.5, ease: "power2.in", overwrite: "auto" });
      gsap.to(caseStudiesNavRef.current, { x: -120, y: 0, scale: 0, opacity: 0, pointerEvents: "none", duration: 0.5, ease: "power2.in", overwrite: "auto" });
      gsap.to(resumeNavRef.current, { x: 0, y: -60, scale: 0, opacity: 0, pointerEvents: "none", duration: 0.5, ease: "power2.in", overwrite: "auto" });
      gsap.to(contactNavRef.current, { x: 0, y: -120, scale: 0, opacity: 0, pointerEvents: "none", duration: 0.5, ease: "power2.in", overwrite: "auto" });
    }
  });

  // --- UNIFIED SCROLL HANDLER (created once, never recreated) ---
  // Uses refs for isTidied/isScattered so there are zero stale-closure issues.
  // No GSAP Observer — vanilla listeners give us full control over preventDefault.
  useEffect(() => {
    if (!introDone) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (!isTidiedRef.current || isAnimatingRef.current) {
        // SCATTERED or ANIMATING: block native scroll for the full animation window
        e.preventDefault();
        if (!isTidiedRef.current && e.deltaY > 0 && isScatteredRef.current && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          handleTidyFlanks(true);
          setTimeout(() => { 
            isAnimatingRef.current = false; 
            ScrollTrigger.refresh();
          }, 1100);
        }
      } else {
        // TIDIED & settled: native scroll runs freely; un-tidy only at top scrolling up
        if (window.scrollY <= 0 && e.deltaY < 0 && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          handleTidyFlanks(false);
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      if (!isTidiedRef.current || isAnimatingRef.current) {
        // SCATTERED or ANIMATING: block native scroll for the full animation window
        e.preventDefault();
        if (!isTidiedRef.current && touchStartY - touchY > 30 && isScatteredRef.current && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          handleTidyFlanks(true);
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
        }
      } else {
        // TIDIED & settled: native scroll runs freely; un-tidy on swipe-down at top
        if (touchY - touchStartY > 30 && window.scrollY <= 0 && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          handleTidyFlanks(false);
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
        }
      }
    };

    // passive: false is required to allow e.preventDefault() in the handler.
    // When isTidied, we do NOT call preventDefault so native scroll works normally.
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [introDone]); // Created ONCE — refs keep it in sync with state, no re-registration needed

  useGSAP(() => {
    if (!introDone) return;
    gsap.set([aboutNavRef.current, caseStudiesNavRef.current], { x: (i) => -60 * (i + 1), y: 0, scale: 0, opacity: 0, pointerEvents: "none" });
    gsap.set([resumeNavRef.current, contactNavRef.current], { x: 0, y: (i) => -60 * (i + 1), scale: 0, opacity: 0, pointerEvents: "none" });
  }, [introDone]);

  const cornerNavItem = { id: "home", label: "Home", icon: Home };
  const rightNavItems = [{ id: "about", label: "About", icon: User }, { id: "case-studies", label: "Case Studies", icon: FolderGit2 }];
  const downNavItems = [{ id: "resume", label: "CV", icon: Briefcase }, { id: "contact", label: "Contact", icon: Mail }];

  const handleNavClick = (e, id) => {
    e.stopPropagation();
    if (id === "resume") {
      window.open("https://drive.usercontent.google.com/download?id=1J9eMbBf62-NYkyTMx_HyjAC6XcZQTKZV&export=download&authuser=0", "_blank");
      return;
    }
    setActiveNavTab(id);
    if (id === "home") {
      handleTidyFlanks(false);
    } else if (id === "case-studies") {
      if (!isTidied) handleTidyFlanks(true);
      setTimeout(() => {
        const element = document.getElementById("case-studies-section");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (id === "about") {
      if (!isTidied) handleTidyFlanks(true);
      setTimeout(() => {
        const element = document.getElementById("about-me-section");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const taglineText = `Somewhere between client projects, LeetCode grind, and asking my own LLM why it's hallucinating.`;
  const taglineWords = taglineText.split(" ");

  return (
    <div className="bg-[#FFEED6] min-h-screen w-full relative overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Caveat:wght@500;600;700&display=swap" rel="stylesheet" />



      <div className="pointer-events-none fixed inset-0 z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.12)]" />

      <div
        className="pointer-events-none fixed inset-0 z-0 select-none opacity-65"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(34, 34, 34, 0.12) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(34, 34, 34, 0.12) 1.5px, transparent 1.5px)`,
          backgroundSize: '42px 42px',
          maskImage: 'radial-gradient(circle at center, black 75%, transparent 98%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 75%, transparent 98%)'
        }}
      />

      {!introDone && (
        <VideoIntro isActive={isTabActive} onComplete={() => {
          setIntroDone(true);
          if (window.innerWidth < 640) {
            // Mobile: show disclaimer first — heroReady fires after Got it
            setShowMobileDisclaimer(true);
          } else {
            // Desktop: start hero animation immediately
            setHeroReady(true);
          }
        }} />
      )}

      {/* ── Mobile Disclaimer ── */}
      {showMobileDisclaimer && (
        <div
          ref={disclaimerRef}
          className="fixed inset-0 z-[9998] flex items-center justify-center px-8 opacity-0"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(255, 238, 214, 0.92)"
          }}
        >
          <div className="text-center max-w-sm">
            <div className="text-4xl mb-4">📱</div>
            <p className="font-['Fredoka'] text-[#2E2019] text-xl font-bold leading-snug mb-4">
              You are reviewing this portfolio on a Mobile Phone?
            </p>
            <p className="font-['Fredoka'] text-[#2E2019] text-lg font-bold leading-relaxed mb-2">
              Due to less space on this screen you are missing a lot.
            </p>
            <p className="font-['Fredoka'] text-[#2E2019] text-lg font-bold leading-relaxed mb-6">
              Prefer you to review this on a Laptop or bigger screen.
            </p>
            <p className="font-['Fredoka'] text-[#2E2019] text-xl font-bold">
              Thankyou
            </p>
            <button
              onClick={() => {
                gsap.to(disclaimerRef.current, { 
                  opacity: 0, 
                  scale: 0.95, 
                  duration: 0.4, 
                  ease: "power2.in", 
                  onComplete: () => {
                    setShowMobileDisclaimer(false);
                    setHeroReady(true);
                  }
                });
              }}
              className="mt-7 bg-[#2E2019] text-[#FFEED6] font-['Fredoka'] font-bold px-8 py-3 rounded-full text-lg shadow-xl active:scale-95 transition-transform"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {introDone && (
        <nav ref={glassNavRef} className="fixed top-6 left-6 z-50 select-none pointer-events-auto max-w-[calc(100vw-3rem)]" onClick={(e) => e.stopPropagation()}>
          <div className="relative flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <GlassNavItem item={cornerNavItem} isActive={activeNavTab === cornerNavItem.id} isDarkBg={activeNavTab === 'about'} onClick={(e) => handleNavClick(e, cornerNavItem.id)} tooltipPosition="bottom" />
              <GlassNavItem ref={aboutNavRef} item={rightNavItems[0]} isActive={activeNavTab === rightNavItems[0].id} isDarkBg={activeNavTab === 'about'} onClick={(e) => handleNavClick(e, rightNavItems[0].id)} tooltipPosition="bottom" />
              <GlassNavItem ref={caseStudiesNavRef} item={rightNavItems[1]} isActive={activeNavTab === rightNavItems[1].id} isDarkBg={activeNavTab === 'about'} onClick={(e) => handleNavClick(e, rightNavItems[1].id)} tooltipPosition="bottom" />
            </div>
            <div className="flex flex-col gap-3">
              <GlassNavItem ref={resumeNavRef} item={downNavItems[0]} isActive={activeNavTab === downNavItems[0].id} isDarkBg={activeNavTab === 'about'} onClick={(e) => handleNavClick(e, downNavItems[0].id)} tooltipPosition="right" />
              <GlassNavItem ref={contactNavRef} item={downNavItems[1]} isActive={activeNavTab === downNavItems[1].id} isDarkBg={activeNavTab === 'about'} onClick={(e) => handleNavClick(e, downNavItems[1].id)} tooltipPosition="right" />
            </div>
          </div>
        </nav>
      )}

      {/* FIXED HEIGHT HERE forces the case studies out of view until scroll */}
      <main
        className="w-full flex items-center justify-center relative z-20"
        style={{ visibility: introDone ? "visible" : "hidden", height: "100vh" }}
      >
        <div ref={containerRef} onClick={!isScattered ? handleScatterOnce : undefined} onTouchEnd={!isScattered ? handleScatterOnce : undefined} onMouseEnter={handleContainerMouseEnter} onMouseLeave={handleContainerMouseLeave} className={`relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center select-none ${isScattered ? "cursor-default" : "cursor-pointer"}`}>
          <div id="instagram-standalone-wrapper" ref={instaBoxRef} onMouseEnter={handleInstaMouseEnter} onMouseLeave={handleInstaMouseLeave} className="opacity-0 absolute -top-72 left-40 -translate-x-1/2 flex items-center gap-4 z-50 pointer-events-none select-none">
            <a href="https://www.instagram.com/ayush_numbers/?hl=en" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="relative flex flex-col items-center justify-center cursor-pointer pointer-events-auto z-50">
              <div ref={instaTooltipRef} className="opacity-0 scale-0 pointer-events-none absolute -top-14 px-3.5 py-1.5 bg-[#2E2019] text-[#FFEED6] font-['Fredoka'] text-xs sm:text-sm font-bold rounded-full shadow-md whitespace-nowrap z-30">Instagram</div>
              <img src={InstagramPng} alt="Instagram" className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md flex-shrink-0" />
            </a>
            <div id="instagram-text-box" ref={instaTextBoxRef} className={`hidden sm:flex bg-[#2E2019] text-[#FFEED6] px-6 py-3.5 rounded-2xl shadow-[0_10px_25px_rgba(46,32,25,0.25)] font-['Fredoka'] text-lg sm:text-xl font-bold tracking-wide text-center flex-col justify-center min-h-[72px] w-[280px] sm:w-[310px] ${!isTidied ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              <span className="block leading-tight">Make sure to follow me</span>
              <span className="block leading-tight text-[#FFEED6]/80 text-sm sm:text-base font-semibold mt-0.5">(I have zero followers)</span>
            </div>
          </div>

          <div id="main-title-container" className="absolute -top-40 sm:-top-36 flex flex-col items-center justify-center text-center z-40 pointer-events-none select-none w-screen p-2">
            <div id="name-badge-container" ref={nameBadgeRef} className="opacity-0 mb-3 sm:mb-4 bg-[#2E2019] text-[#FFEED6] px-6 py-2.5 sm:px-8 sm:py-3 rounded-2xl shadow-[0_10px_30px_rgba(46,32,25,0.2)] font-['Fredoka'] text-sm sm:text-xl font-bold tracking-wide pointer-events-none">
              <span>Hey!! I am Ayush👋</span>
            </div>
            <div id="main-title-text" ref={mainTitleRef} className="opacity-0 bg-[#2E2019] text-[#FFEED6] px-6 py-5 sm:px-12 sm:py-8 rounded-[2rem] shadow-[0_20px_50px_rgba(46,32,25,0.28)] font-['Fredoka'] text-base sm:text-3xl font-black tracking-wide max-w-[90vw] sm:max-w-[600px] mb-3 sm:mb-5 leading-snug flex flex-wrap justify-center relative z-20 pointer-events-none">
              {/* Always render word-by-word to prevent mid-word breaks; char-spans still exist for GSAP targeting */}
              {headlineText.split(" ").map((word, i, arr) => (
                  <span key={i} className="scroll-char inline-block whitespace-nowrap">
                    {word}{i < arr.length - 1 ? "\u00A0" : ""}
                  </span>
              ))}
            </div>
            <div id="sub-heading-container" ref={subHeadingRef} className="opacity-0 mt-1 sm:mt-4 bg-[#2E2019] text-[#FFEED6] px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-2xl font-['Fredoka'] text-sm sm:text-2xl font-bold tracking-wide whitespace-nowrap max-w-[92vw] relative z-10 pointer-events-none">
              <span id="sub-heading-text">Scroll Down To Unscatter</span>
            </div>
          </div>

          <div ref={clickMeRef} className="opacity-0 pointer-events-none absolute -top-14 px-5 py-2 bg-[#2E2019] text-[#FFEED6] font-['Fredoka'] text-lg sm:text-xl font-black rounded-full shadow-xl whitespace-nowrap z-40 animate-bounce">{isMobile ? "Tap Me!!" : "Click Me !!"}</div>

          {iconData.map((item, index) => (
            <div
              key={index}
              ref={addToWrappersRef}
              onMouseEnter={(e) => handleIconMouseEnter(e, item.isVinyl, index)}
              onMouseLeave={(e) => handleIconMouseLeave(e, item.isVinyl, index)}
              onClick={(e) => {
                if (isScattered) {
                  e.stopPropagation();
                  if (item.isDuck) {
                    playQuackSound();
                    gsap.fromTo(e.currentTarget, { scale: 1.25 }, { scale: isTidied ? 0.9 : 1.0, duration: 0.3, ease: "back.out(2)", overwrite: "auto" });
                  } else if (item.isPlant) {
                    const drops = e.currentTarget.querySelectorAll(".plant-droplet");
                    const img = e.currentTarget.querySelector("img");
                    if (drops.length > 0 && img) {
                      gsap.set(drops, { y: -30, opacity: 0 });
                      gsap.timeline().to(drops, { y: 30, opacity: 1, duration: 0.35, stagger: 0.12, ease: "power1.in" })
                        .to(drops, { opacity: 0, duration: 0.15, stagger: 0.12 }, 0.2)
                        .to(img, { scaleY: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }, 0.4);
                    }
                  } else if (item.isVinyl) {
                    setIsInterestsOpen(true);
                  } else if (item.isTerminal) {
                    setIsTerminalOpen(!isTerminalOpen);
                  } else if (item.isAbout) {
                    if (!isTidiedRef.current) {
                      isAnimatingRef.current = true;
                      handleTidyFlanks(true);
                      setTimeout(() => { isAnimatingRef.current = false; }, 1100);
                    }
                    if (aboutMeRef.current) {
                      setTimeout(() => {
                        aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  } else if (item.isResume) {
                    window.open("https://drive.usercontent.google.com/download?id=1J9eMbBf62-NYkyTMx_HyjAC6XcZQTKZV&export=download&authuser=0", "_blank");
                  } else if (item.link) {
                    window.open(item.link, "_blank");
                  }
                }
              }}
              className={`absolute flex flex-col items-center justify-center pointer-events-auto ${item.isContact ? "z-50" : "z-40"}`}
            >
              <div ref={addToTooltipsRef} className="opacity-0 scale-0 pointer-events-none absolute -top-10 px-3 py-1 bg-[#2E2019] text-[#FFEED6] font-['Fredoka'] text-xs sm:text-sm font-bold rounded-full shadow-md whitespace-nowrap z-30">{item.label}</div>
              {item.link && isScattered ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="cursor-pointer pointer-events-auto z-30">
                  <img ref={addToImgRefs} src={item.src} alt={item.label} className="w-16 sm:w-24 h-auto rounded-xl" />
                </a>
              ) : (
                <img ref={addToImgRefs} src={item.src} alt={item.label} className={`w-16 sm:w-24 h-auto rounded-xl ${!isScattered ? "cursor-pointer" : ""}`} />
              )}
              {/* Additional Popups Hidden for Brevity in Display, Rendered in Component */}
              {item.isContact && (
                <div id="contact-note-container" ref={contactArrowRef} className="hidden sm:flex opacity-0 pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 items-center z-30">
                  <img src={Rightcureved} alt="Arrow" className="w-14 sm:w-16 h-auto select-none pointer-events-none mr-2 flex-shrink-0" />
                  <div className="bg-[#2E2019] text-[#FFEED6] px-5 py-3 rounded-2xl shadow-2xl font-['Fredoka'] text-center whitespace-nowrap"><span className="block text-base sm:text-lg font-bold">Say Hi!!</span></div>
                </div>
              )}
              {item.isGithub && (
                <div id="github-note-container" ref={githubBoxRef} className="hidden sm:flex opacity-0 pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 items-center z-30">
                  <div className="bg-[#2E2019] text-[#FFEED6] px-5 py-3 rounded-2xl shadow-2xl font-['Fredoka'] text-center whitespace-nowrap"><span className="block text-base sm:text-lg font-bold">Behind the commits</span></div>
                </div>
              )}
              {item.isLinkedin && (
                <div id="linkedin-note-container" ref={linkedinArrowRef} className="hidden sm:flex opacity-0 pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 items-center flex-row-reverse z-30">
                  <svg width="60" height="20" viewBox="0 0 80 20" fill="none" className="w-12 sm:w-16 h-auto text-[#2E2019] ml-2 flex-shrink-0">
                    <path d="M 75 10 L 10 10 M 20 3 L 5 10 L 20 17" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="bg-[#2E2019] text-[#FFEED6] px-5 py-3 rounded-2xl shadow-2xl font-['Fredoka'] text-left whitespace-nowrap">
                    <span className="block text-base sm:text-lg font-bold leading-tight">My LinkedIn Profile</span>
                    <span className="block text-sm sm:text-base font-semibold text-[#FFEED6]/80 mt-0.5">Let's Connect</span>
                  </div>
                </div>
              )}
              {item.isResume && (
                <div id="resume-note-container" ref={resumeArrowRef} className="hidden sm:flex opacity-0 pointer-events-none absolute sm:left-full top-full sm:top-1/2 sm:-translate-y-1/2 mt-2 sm:mt-0 sm:ml-2 flex-col sm:flex-row items-center z-30 sm:rotate-[18deg] origin-left max-w-[300px] sm:max-w-none">
                  <img src={Rotatedcureved} alt="Arrow" className="w-16 sm:w-20 h-auto select-none pointer-events-none sm:mr-2 flex-shrink-0" />
                  <div className="bg-[#2E2019] text-[#FFEED6] px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl shadow-2xl font-['Fredoka'] text-center max-w-[240px] sm:max-w-[310px]">
                    <p className="text-base sm:text-lg font-bold leading-snug">Pure buzzwords, strategic formatting, and my CV—But it works</p>
                  </div>
                </div>
              )}
              {item.isVinyl && (
                <div id="vinyl-note-container" ref={vinylArrowRef} className="hidden sm:flex opacity-0 pointer-events-none absolute top-full mt-2 flex-col items-center z-30">
                  <img src={CurvedArrow} alt="Arrow" className="w-16 sm:w-20 h-auto select-none pointer-events-none" />
                  <div className="bg-[#2E2019] mt-1 text-[#FFEED6] px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl shadow-2xl font-['Fredoka'] text-center whitespace-nowrap">
                    <span className="block text-base sm:text-lg font-bold tracking-wide">Vibes & Rhythm</span>
                    <span className="block text-sm sm:text-base font-bold text-[#FFEED6]/80 mt-0.5">(My Music)</span>
                  </div>
                </div>
              )}
              {item.isAbout && (
                <div id="about-note-container" ref={aboutBoxRef} className="hidden sm:flex opacity-0 pointer-events-none absolute top-full mt-3 flex-col items-center z-30">
                  <div className="bg-[#2E2019] text-[#FFEED6] px-6 py-2.5 sm:px-8 sm:py-3 rounded-2xl shadow-2xl font-['Fredoka'] text-center max-w-[85vw] sm:max-w-[520px] w-max whitespace-normal sm:whitespace-nowrap">
                    <p className="text-base sm:text-lg font-bold leading-snug">Every portfolio needs an About section.<br /> Mine comes with unnecessary lore</p>
                  </div>
                </div>
              )}
              {item.isDuck && <div className="absolute pointer-events-none w-full h-full inset-0 flex items-center justify-center z-10" />}
              {item.isPlant && (
                <div className="plant-water-droplets absolute top-[-40px] left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none z-30">
                  <span className="plant-droplet opacity-0 text-lg">💧</span>
                  <span className="plant-droplet opacity-0 text-lg">💧</span>
                  <span className="plant-droplet opacity-0 text-lg">💧</span>
                </div>
              )}
              {item.isTerminal && isTerminalOpen && (
                <div onClick={(e) => e.stopPropagation()} onWheel={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()} className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] bg-[#2E2019] border border-[#FFEED6]/30 text-[#FFEED6] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] overflow-hidden font-mono z-50 text-left pointer-events-auto cursor-default">
                  <div className="bg-[#1f1511] px-3.5 py-2.5 flex items-center justify-between border-b border-[#FFEED6]/10 select-none">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] cursor-pointer" onClick={() => setIsTerminalOpen(false)} />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[#FFEED6]/60 text-xs font-semibold">terminal.sh</span>
                    <button onClick={() => setIsTerminalOpen(false)} className="text-[#FFEED6]/60 hover:text-[#FFEED6] text-xs font-bold">✕</button>
                  </div>
                  <div className="p-4 min-h-[150px] flex flex-col">
                    <div className="flex items-center gap-1.5 mb-2 select-none text-xs text-[#a2df74] font-bold"><span>ayush@portfolio:~$ python3</span></div>
                    <textarea value={terminalCode} onChange={(e) => setTerminalCode(e.target.value)} className="flex-1 w-full bg-transparent border-none outline-none resize-none text-xs font-mono leading-relaxed text-[#FFEED6]/90 caret-[#FFEED6] placeholder-[#FFEED6]/30 select-text" placeholder="Type python here..." autoFocus />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div ref={centerBioRef} onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()} className="fixed inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-none opacity-0 translate-y-5 font-['Caveat']">
          <div className="flex flex-col items-center justify-center text-center select-text">
            <h1 className="font-['Caveat'] text-5xl sm:text-7xl font-bold tracking-wide text-[#2E2019] mb-1">Ayush Pachouri</h1>
            <p className="font-['Caveat'] text-2xl sm:text-3xl font-semibold text-[#2E2019]/80 mb-6">Computer Science Student</p>
            <p id="center-bio-tagline" className="font-['Caveat'] text-2xl sm:text-4xl font-semibold max-w-xl leading-relaxed text-[#2E2019] flex flex-wrap justify-center gap-x-1.5 gap-y-1">
              {taglineWords.map((word, idx) => (
                <span key={idx} className="center-bio-word inline-block opacity-0">{word}</span>
              ))}
            </p>
          </div>
        </div>
      </main>

      {/* Renders safely beneath the 100vh hero section once the video completes */}
      {introDone && <CaseStudiesSection />}

      {/* About Me Section in natural page flow */}
      {introDone && <AboutMeSection ref={aboutMeRef} />}
      {introDone && <Footer />}
      {/* Global Persistent Audio Element */}
      <audio 
        ref={audioRef} 
        src={activeTrack.src} 
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Pinned Vinyl Icon / Widget when music is playing */}
      {isPlaying && (
        <div 
          onClick={() => setIsPlaying(false)}
          className="fixed top-6 right-6 z-[90] cursor-pointer flex items-center bg-[#2E2019] text-[#FFEED6] p-2.5 pr-5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.4)] border-2 border-[#E2725B] hover:scale-105 active:scale-95 transition-all group pointer-events-auto select-none"
        >
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#FFEED6]/20">
            <img 
              src={activeTrack.cover} 
              alt="Vinyl Playing" 
              className="w-full h-full object-cover animate-spin" 
              style={{ animationDuration: '4s' }}
            />
            <div className="absolute inset-0 bg-black/20 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFEED6]"></div>
            </div>
          </div>
          <div className="ml-3 flex flex-col overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase text-[#E2725B] tracking-wider">Now Playing</span>
              <span className="flex items-end space-x-0.5 h-2.5">
                <span className="w-1 bg-[#E2725B] rounded-t-sm animate-bounce" style={{ height: "60%", animationDuration: "0.4s" }}></span>
                <span className="w-1 bg-[#E2725B] rounded-t-sm animate-bounce" style={{ height: "100%", animationDuration: "0.6s" }}></span>
                <span className="w-1 bg-[#E2725B] rounded-t-sm animate-bounce" style={{ height: "40%", animationDuration: "0.5s" }}></span>
              </span>
            </div>
            <span className="text-sm font-bold text-[#FFEED6] truncate max-w-[140px] leading-tight group-hover:hidden" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {activeTrack.title}
            </span>
            <span className="text-sm font-bold text-[#E2725B] truncate max-w-[140px] leading-tight hidden group-hover:block" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Stop Music
            </span>
          </div>
        </div>
      )}

      {isInterestsOpen && (
        <InterestsSection 
          onClose={() => setIsInterestsOpen(false)} 
          activeTrack={activeTrack}
          setActiveTrack={setActiveTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      )}
    </div>
  );
}

const GlassNavItem = forwardRef(({ item, isActive, isDarkBg, onClick, tooltipPosition }, ref) => {
  const Icon = item.icon;
  const tooltipPosClass = tooltipPosition === "right" ? "left-full ml-3 top-1/2 -translate-y-1/2" : "top-full mt-3 left-1/2 -translate-x-1/2";
  
  const inactiveBg = isDarkBg ? "bg-[#FFEED6]/10 border-[#FFEED6]/20 hover:bg-[#FFEED6]/25 hover:border-[#FFEED6]/50" : "bg-[#2E2019]/15 border-[#2E2019]/20 hover:bg-[#2E2019]/30 hover:border-[#2E2019]/40";
  const inactiveText = isDarkBg ? "text-[#FFEED6]/80 hover:text-[#FFEED6]" : "text-[#2E2019]/80 hover:text-[#2E2019]";

  return (
    <div ref={ref} className="relative group">
      <button onClick={onClick} className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 ease-out backdrop-blur-2xl border ${isActive ? "bg-[#E2725B] scale-110 border-[#E2725B] shadow-[0_0_20px_rgba(226,114,91,0.6)] text-[#FFEED6]" : `${inactiveBg} shadow-lg active:scale-95 hover:scale-110 ${inactiveText}`}`}>
        <Icon className={`w-5 h-5 stroke-[2] drop-shadow-sm transition-colors duration-500 ${isActive ? "text-[#FFEED6]" : (isDarkBg ? "text-[#FFEED6]" : "text-[#2E2019]")}`} />
      </button>
      <div className={`absolute pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out z-50 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap backdrop-blur-md shadow-lg ${isDarkBg ? "bg-[#FFEED6]/90 text-[#120D0A] border-[#120D0A]/20" : "bg-[#2E2019]/90 text-[#FFEED6] border-[#FFEED6]/20"} ${tooltipPosClass}`}>{item.label}</div>
    </div>
  );
});

GlassNavItem.displayName = "GlassNavItem";