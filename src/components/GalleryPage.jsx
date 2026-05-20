import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import gsap from "gsap";
import "./GalleryPage.css";

const gallery4 =
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779286641/model-1_gocjxm.webp";
const gallery5 =
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779286641/model-2_nlnvd1.webp";

const CATEGORIES = ["All", "Models", "Travel", "Food", "Architecture"];

const STRIP_A = Array(4)
  .fill("MODELS • TRAVEL • FOOD • ARCHITECTURE • ")
  .join("");
const STRIP_B = Array(4)
  .fill("EDITORIAL • LIFESTYLE • COMMERCIAL • FASHION • NATURE • ")
  .join("");

const globToSortedSrcs = (glob) =>
  Object.entries(glob)
    .sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map(([, src]) => src);

const FOOD_IMAGES = globToSortedSrcs(
  import.meta.glob("../assets/food_images/*.webp", {
    eager: true,
    import: "default",
  }),
);

const MODEL_IMAGES = [
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779286641/model-1_gocjxm.webp",
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779286641/model-2_nlnvd1.webp",
  "https://res.cloudinary.com/dp3pjvvvy/image/upload/v1779286641/model-3_s9r9jj.webp",
];

const ARCH_IMAGES = globToSortedSrcs(
  import.meta.glob("../assets/architecture/*.webp", {
    eager: true,
    import: "default",
  }),
);

const FOOD_PHOTOS = FOOD_IMAGES.map((src, index) => ({
  id: 1000 + index,
  src,
  title: `Food Story ${String(index + 1).padStart(2, "0")}`,
  cat: "Food",
}));

const MODEL_PHOTOS = MODEL_IMAGES.map((src, index) => ({
  id: 2000 + index,
  src,
  title: `Model Story ${String(index + 1).padStart(2, "0")}`,
  cat: "Models",
}));

const ARCH_PHOTOS = ARCH_IMAGES.map((src, index) => ({
  id: 3000 + index,
  src,
  title: `Architecture ${String(index + 1).padStart(2, "0")}`,
  cat: "Architecture",
}));

const ALL_PHOTOS = [
  // Models — curated set
  ...MODEL_PHOTOS,
  // Travel
  { id: 11, src: gallery4, title: "Rajasthan Gold", cat: "Travel" },
  { id: 12, src: gallery5, title: "Kerala Aerial", cat: "Travel" },
  { id: 13, src: gallery4, title: "Coastal Journey", cat: "Travel" },
  { id: 14, src: gallery4, title: "Desert Dunes", cat: "Travel" },
  { id: 15, src: gallery5, title: "Hill Station", cat: "Travel" },
  { id: 16, src: gallery5, title: "Backwater Drift", cat: "Travel" },
  { id: 17, src: gallery4, title: "Temple Ruins", cat: "Travel" },
  { id: 18, src: gallery5, title: "Mountain Pass", cat: "Travel" },
  { id: 19, src: gallery4, title: "Old City Walls", cat: "Travel" },
  { id: 20, src: gallery4, title: "Sunrise Valley", cat: "Travel" },
  // Food
  ...FOOD_PHOTOS,
  // Architecture — real images from assets/architecture
  ...ARCH_PHOTOS,
];

const UNIQUE_ALL_PHOTOS = (() => {
  const seen = new Set();
  return ALL_PHOTOS.filter((photo) => {
    if (seen.has(photo.src)) return false;
    seen.add(photo.src);
    return true;
  });
})();

const GalleryPage = forwardRef(function GalleryPage({ isOpen, onClose }, ref) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const catsRef = useRef(null);
  const gridRef = useRef(null);
  const tlRef = useRef(null);
  const isChanging = useRef(false);

  const filteredPhotos =
    activeCategory === "All"
      ? UNIQUE_ALL_PHOTOS
      : ALL_PHOTOS.filter((p) => p.cat === activeCategory);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (lightboxImg) {
        setLightboxImg(null);
        return;
      }
      handleClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, lightboxImg]);

  // Entry animation
  useEffect(() => {
    if (!isOpen || !pageRef.current) return;
    tlRef.current?.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(pageRef.current, {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.72,
      ease: "power4.inOut",
    });

    const heroEls = heroRef.current?.querySelectorAll("[data-anim]") ?? [];
    tl.fromTo(
      heroEls,
      { y: 52, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.62, ease: "power3.out" },
      "-=0.44",
    );

    const catBtns = catsRef.current?.querySelectorAll("button") ?? [];
    tl.fromTo(
      catBtns,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.42, ease: "power3.out" },
      "-=0.32",
    );

    return () => tl.kill();
  }, [isOpen]);

  // Grid animation on category change (and initial load)
  useEffect(() => {
    if (!isOpen || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gp-photo-item");
    if (!items.length) return;
    gsap.fromTo(
      items,
      { y: 64, opacity: 0, scale: 0.93 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.032,
        duration: 0.56,
        ease: "power3.out",
      },
    );
  }, [activeCategory, isOpen]);

  const handleClose = useCallback(() => {
    if (!pageRef.current) {
      onClose();
      return;
    }
    gsap.to(pageRef.current, {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.52,
      ease: "power4.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useImperativeHandle(
    ref,
    () => ({
      close: handleClose,
    }),
    [handleClose],
  );

  const handleCategoryChange = useCallback(
    (cat) => {
      if (cat === activeCategory || isChanging.current) return;
      isChanging.current = true;
      setActiveCategory(cat);

      window.setTimeout(() => {
        isChanging.current = false;
      }, 180);
    },
    [activeCategory],
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="gp-overlay" ref={pageRef} data-lenis-prevent>
        {/* Sticky top bar */}
        <div className="gp-topbar">
          <button
            className="gp-close-btn"
            onClick={handleClose}
            aria-label="Close gallery"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M1.5 1.5L13.5 13.5M13.5 1.5L1.5 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Hero */}
        <div className="gp-hero" ref={heroRef}>
          <span className="gp-eyebrow" data-anim>
            Visual Archive
          </span>
          <h1 className="gp-main-title" data-anim>
            Our <em>Photography</em>
          </h1>
          <p className="gp-count-line" data-anim>
            {UNIQUE_ALL_PHOTOS.length} photographs &nbsp;·&nbsp;{" "}
            {CATEGORIES.length - 1} categories
          </p>
        </div>

        {/* Marquee strips */}
        <div className="gp-strips">
          <div className="gp-strip gp-strip--left">
            <div className="gp-strip-track">
              <span className="gp-strip-text">{STRIP_A}</span>
              <span className="gp-strip-text">{STRIP_A}</span>
            </div>
          </div>
          <div className="gp-strip gp-strip--right">
            <div className="gp-strip-track">
              <span className="gp-strip-text">{STRIP_B}</span>
              <span className="gp-strip-text">{STRIP_B}</span>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="gp-cats-bar" ref={catsRef}>
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? UNIQUE_ALL_PHOTOS.length
                : ALL_PHOTOS.filter((p) => p.cat === cat).length;
            return (
              <button
                key={cat}
                className={`gp-cat-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
                <span className="gp-cat-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Photo grid */}
        <div className="gp-grid" ref={gridRef}>
          {filteredPhotos.map((photo, i) => {
            const variant = `v${(i % 5) + 1}`;
            return (
              <div
                key={photo.id}
                className={`gp-photo-item gp-photo-item--${variant}`}
                onClick={() => setLightboxImg(photo)}
              >
                <div className="gp-photo-inner">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      e.currentTarget.classList.add("img-loaded");
                      e.currentTarget.parentElement?.classList.add(
                        "img-loaded",
                      );
                    }}
                    ref={(el) => {
                      if (el?.complete && el.naturalWidth > 0) {
                        el.classList.add("img-loaded");
                        el.parentElement?.classList.add("img-loaded");
                      }
                    }}
                  />
                  <div className="gp-photo-overlay" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="gp-lightbox" onClick={() => setLightboxImg(null)}>
          <button
            className="gp-lb-close"
            onClick={() => setLightboxImg(null)}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="gp-lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg.src} alt={lightboxImg.title} />
          </div>
        </div>
      )}
    </>
  );
});

export default GalleryPage;
