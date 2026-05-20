import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CubeShowcase.css";
import GridBackground from "./GridBackground";
const vid1 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285013/GoCineflow_Reel_2_D2_cjlnri.mp4";
const vid2 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285017/Piatto_Pasta_Reel_D1_mgzuvm.mp4";
const vid3 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285065/BJ_Don_Julio_D1_ca1mmo.mp4";
const vid4 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285067/BJ_Dum_Charades_D2_1_hsxhz4.mp4";
const vid5 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285069/KH_Festive_Reel_icjt0i.mp4";
const vid6 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285059/Piatto_SLOG_Reel_isv5ch.mp4";
const vid7 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285307/KH_Navratri_Day_1_fszjtx.mp4";
const vid8 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285026/Monin_Hz_Shake_Final_Draft_m3upuo.mp4";
const vid9 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779285010/Meridian_Shakes_Screening_Video_D2_wrlhht.mp4";
const vid10 =
  "https://res.cloudinary.com/dp3pjvvvy/video/upload/v1779284982/GoCineflow_Brand_Introduction_Reel_riqef3.mp4";

gsap.registerPlugin(ScrollTrigger);

const PhoneCard = React.forwardRef(function PhoneCard(
  { item, isMuted, onActivate },
  ref,
) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const el = wrapperRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = item.src;
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [item.src]);

  return (
    <div
      className="phone-mock"
      ref={(node) => {
        wrapperRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      onClick={onActivate}
    >
      <div className="phone-btn phone-btn-action" />
      <div className="phone-btn phone-btn-vol-up" />
      <div className="phone-btn phone-btn-vol-down" />
      <div className="phone-btn phone-btn-power" />

      <div className="phone-glass">
        <div className="phone-island" />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="phone-video"
        />
        <div className="phone-glare" />
        {!isMuted && (
          <div className="phone-audio-indicator">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <span>Audio On</span>
          </div>
        )}
        <div className="phone-home-bar" />
      </div>
    </div>
  );
});

const PHONE_VIDEOS = [
  { src: vid1, label: "GoCineflow Reel" },
  { src: vid2, label: "Piatto Pasta" },
  { src: vid3, label: "BJ Don Julio" },
  { src: vid4, label: "BJ Dum Charades" },
  { src: vid5, label: "Orra Cafe" },
  { src: vid6, label: "Piatto SLOG" },
  { src: vid7, label: "KH Navratri" },
  { src: vid8, label: "Monin Shake" },
  { src: vid9, label: "Meridian Shakes" },
  { src: vid10, label: "GoCineflow Intro" },
];

export default function CubeShowcase() {
  const sectionRef = useRef(null);
  const phonesRef = useRef([]);
  const headingRef = useRef(null);
  const [activeAudio, setActiveAudio] = useState(null);

  const handleActivate = (i) =>
    setActiveAudio((prev) => (prev === i ? null : i));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-fx]"),
        { y: 36, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        phonesRef.current.filter(Boolean),
        { y: 90, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: { amount: 0.65, from: "start" },
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="reels-section grid-host">
      <GridBackground direction="up-right" />

      <div className="reels-inner">
        <div ref={headingRef} className="reels-header">
          <span className="section-label" data-fx>
            Reels &amp; Shorts
          </span>
          <h2 className="reels-heading" data-fx>
            Content <em>in motion</em>
          </h2>
        </div>

        <div className="reels-grid">
          {PHONE_VIDEOS.slice(0, 4).map((item, i) => (
            <PhoneCard
              key={i}
              item={item}
              isMuted={activeAudio !== i}
              onActivate={() => handleActivate(i)}
              ref={(el) => (phonesRef.current[i] = el)}
            />
          ))}
        </div>

        <p className="reels-quote" data-fx>
          "Every frame is a feeling — every cut, a heartbeat."
        </p>

        <div className="reels-grid">
          {PHONE_VIDEOS.slice(4, 8).map((item, i) => (
            <PhoneCard
              key={i + 4}
              item={item}
              isMuted={activeAudio !== i + 4}
              onActivate={() => handleActivate(i + 4)}
              ref={(el) => (phonesRef.current[i + 4] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
