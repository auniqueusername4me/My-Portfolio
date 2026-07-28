// VideoIntro.jsx
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import helloVideo from "./Hello.mp4";

export default function VideoIntro({ isActive, onComplete }) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [show, setShow] = useState(true);

  // Runs once on mount: listens for the video finishing naturally,
  // then fades the wrapper out and calls onComplete to hand control back to App.
  useGSAP(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      gsap.to(wrapperRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setShow(false);
          onComplete?.();
        },
      });
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  // Pause/resume based on tab visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  if (!show) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
    >
      {/* On mobile: show video in a horizontal/landscape-friendly contained box */}
      <video
        ref={videoRef}
        src={helloVideo}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-contain sm:object-cover"
      />
    </div>
  );
}