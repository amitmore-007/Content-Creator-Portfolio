import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Services.css";
import GridBackground from "./GridBackground";
const servicePodcastImage =
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779285860/service_podcast_jize3p.jpg";
const serviceBrandContentImage =
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779285860/service_brand_content_ogiqbm.jpg";
const serviceBrandIntegrationImage =
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779285859/service_brand_integration_pxm3bw.jpg";
const servicePostProductionImage =
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779285859/service_post_production_bcovqn.jpg";

gsap.registerPlugin(ScrollTrigger);

// Uses available local assets, with a brand fallback image.

const SERVICES = [
  {
    num: "01",
    title: "Podcast Production",
    subtitle: "Direction • Shooting • Editing",
    desc: "End-to-end podcast production built for creators, brands, educators, and businesses — from studio direction and multi-camera shoots to cinematic editing, sound design, and social-ready content.",
    image: servicePodcastImage,
    tags: ["Podcasts", "Interviews", "Multicam", "YouTube"],
  },
  {
    num: "02",
    title: "Brand Content Production",
    subtitle: "Commercials • Campaigns • Social Media Content",
    desc: "High-quality visual content crafted for brands across education, FMCG, fashion, hospitality, automotive, lifestyle, and digital businesses — designed to build attention, trust, and engagement.",
    image: serviceBrandContentImage,
    tags: ["Commercial", "Campaigns", "Social", "Brands"],
  },
  {
    num: "03",
    title: "Brand Integration",
    subtitle: "Creative Strategy • Influencer Collaborations • Storytelling",
    desc: "Seamlessly integrating brands into cinematic storytelling, creator content, podcasts, travel films, and social campaigns that feel authentic, engaging, and audience-driven.",
    image: serviceBrandIntegrationImage,
    tags: ["Marketing", "Integration", "Strategy", "Creator"],
  },
  {
    num: "04",
    title: "Post Production",
    subtitle: "Editing • Colour Grading • Sound Design",
    desc: "Professional post-production services that transform raw footage into polished cinematic visuals through editing, colour grading, sound design, motion flow, and final delivery for every platform.",
    image: servicePostProductionImage,
    tags: ["Editing", "Colour", "Sound", "Finishing"],
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll("[data-text-fx]") || [],
        { y: 32, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services grid-host" id="services">
      <GridBackground direction="up-left" />
      <div className="services-header" ref={headerRef}>
        <span className="section-label" data-text-fx>
          Services
        </span>
        <h2 className="services-heading" data-text-fx>
          What I <em>create</em>
        </h2>
        <p className="services-sub" data-text-fx>
          Three disciplines, one singular vision — every project delivers
          unforgettable visuals.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((svc, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="service-card"
          >
            <div className="service-img-wrap">
              <img
                src={svc.image}
                alt={svc.title}
                className="service-img"
                loading="lazy"
                decoding="async"
              />
              <div className="service-img-overlay" />
              <span className="service-num">{svc.num}</span>
            </div>

            <div className="service-body">
              <div className="service-title-wrap">
                <h3 className="service-title">{svc.title}</h3>
                <span className="service-subtitle">{svc.subtitle}</span>
              </div>

              <p className="service-desc">{svc.desc}</p>

              <div className="service-tags">
                {svc.tags.map((tag) => (
                  <span key={tag} className="service-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#contact" className="service-link">
                <span>Enquire</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7H12M12 7L8 3M12 7L8 11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
