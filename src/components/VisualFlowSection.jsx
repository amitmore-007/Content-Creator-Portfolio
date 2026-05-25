import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VisualFlowSection.css";
import GridBackground from "./GridBackground";

gsap.registerPlugin(ScrollTrigger);

const BRAND_VIDEOS = [
  { id: "nu-N-bBnvXs", title: "Brand Reel" },
  { id: "X4z65aEhPTA", title: "Brand Film" },
  { id: "kgZhomRmozc", title: "Campaign" },
  { id: "CoJXT8K6BGo", title: "Brand Story" },
  { id: "EClMEDsd6mk", title: "Commercial" },
  { id: "Fi361i5tBjA", title: "Product Reel" },
];

const MY_VIDEOS = [
  { id: "LRoAnjCZF88", title: "Video Essay" },
  { id: "o305hZ9b2rw", title: "Vlog" },
  { id: "uUwzCIkT9T0", title: "Short Film" },
  { id: "RXksupaGFPg", title: "Behind the Scenes" },
  { id: "e-DKsJ9I_cc", title: "Tutorial" },
  { id: "e2RNkCvMoMk", title: "Reel" },
];

function VideoThumb({ id, title }) {
  const [imgSrc, setImgSrc] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  );

  return (
    <a
      className="yt-thumb"
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${title} on YouTube`}
    >
      <div className="yt-thumb-img-wrap">
        <img
          src={imgSrc}
          alt={title}
          className="yt-thumb-img"
          loading="lazy"
          decoding="async"
          onError={() =>
            setImgSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
          }
        />
        <div className="yt-thumb-overlay">
          <div className="yt-play-btn">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path
                className="yt-play-bg"
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
              />
              <path className="yt-play-arrow" d="M45 24L27 14v20" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function VisualFlowSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.querySelectorAll("[data-fx]"),
        { y: 28, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        },
      );

      gsap.utils.toArray(".yt-group").forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll(".yt-thumb"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 80%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="yt-section grid-host">
      <GridBackground direction="up-left" />

      <div className="yt-inner">
        <div ref={headingRef} className="yt-header">
          <span className="section-label" data-fx>
            YouTube
          </span>
          <h2 className="yt-heading" data-fx>
            Work <em>in frames</em>
          </h2>
          <p className="yt-sub" data-fx>
            Brand collaborations and personal stories — all on camera.
          </p>
        </div>

        <div className="yt-group">
          <div className="yt-group-label">
            <span className="yt-group-tag">Brand Work</span>
          </div>
          <p className="yt-group-desc">
            Branded films, institutional campaigns, and commercial visuals
            created for modern businesses and growing brands.
          </p>
          <div className="yt-grid">
            {BRAND_VIDEOS.map((v) => (
              <VideoThumb key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </div>

        <div className="yt-divider" />

        <div className="yt-group">
          <div className="yt-group-label">
            <span className="yt-group-tag">My Channel</span>
          </div>
          <p className="yt-group-desc">
            A selection of cinematic stories, branded visuals, and creative
            projects crafted across travel, food, fashion, and digital content.
          </p>
          <div className="yt-grid">
            {MY_VIDEOS.map((v) => (
              <VideoThumb key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
