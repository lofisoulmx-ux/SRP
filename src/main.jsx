import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DATA
========================================================= */

const products = [
  {
    number: "01",
    title: "FRESH",
    subtitle: "PRODUCE",
    text: "Fresh produce selected, packed and prepared for demanding markets.",
    video: "/assets/products/product-01.mp4",
  },
  {
    number: "02",
    title: "QUALITY",
    subtitle: "CONTROL",
    text: "Every stage of the process is built around consistency and quality.",
    video: "/assets/products/product-02.mp4",
  },
  {
    number: "03",
    title: "COLD",
    subtitle: "CHAIN",
    text: "Temperature-controlled logistics designed to preserve freshness.",
    video: "/assets/products/product-03.mp4",
  },
];

const infrastructure = [
  {
    number: "01",
    title: "FIELD",
    text: "From carefully selected fields to controlled harvesting.",
    video: "/assets/infrastructure/infrastructure-01.mp4",
  },
  {
    number: "02",
    title: "PACKING",
    text: "People, processes and safety working together inside our packing facilities.",
    video: "/assets/infrastructure/infrastructure-02.mp4",
  },
  {
    number: "03",
    title: "COLD CHAIN",
    text: "Controlled temperature throughout the journey.",
    video: "/assets/infrastructure/infrastructure-03.mp4",
  },
  {
    number: "04",
    title: "LOGISTICS",
    text: "Loads prepared and supervised before reaching their destination.",
    video: "/assets/infrastructure/infrastructure-04.mp4",
  },
];

/* =========================================================
   HEADER
========================================================= */

function Header() {
  const header = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(header.current, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: "#hero",
          start: "12% top",
          end: "28% top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header ref={header} className="header">
      <a href="#hero" className="logo">
        <span className="logo-symbol">SR</span>

        <span className="logo-name">
          SAN REY
          <small>PRODUCE</small>
        </span>
      </a>

      <a href="#contact" className="header-contact">
        CONTACT
      </a>
    </header>
  );
}

/* =========================================================
   VIDEO COMPONENT
========================================================= */

function Video({ src, className = "" }) {
  const video = useRef(null);

  useEffect(() => {
    const element = video.current;

    if (!element) return;

    const play = () => {
      element.play().catch(() => {});
    };

    element.addEventListener("loadeddata", play);
    element.addEventListener("canplay", play);

    play();

    return () => {
      element.removeEventListener("loadeddata", play);
      element.removeEventListener("canplay", play);
    };
  }, [src]);

  return (
    <video
      ref={video}
      className={`video ${className}`}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  const section = useRef(null);
  const media = useRef(null);
  const title = useRef(null);
  const intro = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media.current,
        {
          scale: 1.05,
        },
        {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        title.current,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: -120,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "10% top",
            end: "48% top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        intro.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          delay: 0.4,
          ease: "power3.out",
        }
      );

      gsap.to(".hero-scroll", {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: section.current,
          start: "5% top",
          end: "18% top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="hero" className="hero">
      <div ref={media} className="hero-media">
        <Video
          src="/assets/hero/hero.mp4"
          className="hero-video"
        />
      </div>

      <div className="hero-overlay" />

      <div ref={title} className="hero-title">
        <span className="eyebrow">FROM FIELD TO MARKET</span>

        <h1>
          FRESHNESS
          <br />
          <span>ON THE</span>
          <br />
          <em>MOVE.</em>
        </h1>
      </div>

      <div ref={intro} className="hero-intro">
        <span>01 / SAN REY PRODUCE</span>

        <p>
          Fresh produce.
          <br />
          Reliable logistics.
          <br />
          Global reach.
        </p>
      </div>

      <div className="hero-scroll">
        <span />
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}

/* =========================================================
   MANIFESTO
========================================================= */

function Manifesto() {
  const section = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".manifesto-line", {
        y: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 70%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="manifesto">
      <div className="section-label">02 / OUR APPROACH</div>

      <div className="manifesto-content">
        <span className="eyebrow">MORE THAN PRODUCE</span>

        <h2>
          <span className="manifesto-line">WE MOVE</span>
          <span className="manifesto-line">
            WHAT <em>MATTERS.</em>
          </span>
        </h2>

        <p>
          From the field to the final destination,
          every detail is part of the journey.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT SCENE
========================================================= */

function ProductScene({ product, index }) {
  const scene = useRef(null);
  const media = useRef(null);
  const copy = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media.current,
        {
          opacity: 0,
          scale: 1.08,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scene.current,
            start: "top 90%",
            end: "top 45%",
            scrub: true,
          },
        }
      );

      gsap.to(media.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: scene.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        copy.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scene.current,
            start: "top 65%",
            end: "top 35%",
            scrub: 0.7,
          },
        }
      );
    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={scene}
      className={`product-scene ${
        index % 2 ? "product-reverse" : ""
      }`}
    >
      <div ref={media} className="product-media">
        <Video src={product.video} />
      </div>

      <div className="product-shade" />

      <div ref={copy} className="product-copy">
        <span className="product-number">
          {product.number}
        </span>

        <span className="eyebrow">SAN REY PRODUCE</span>

        <h3>
          {product.title}
          <br />
          <em>{product.subtitle}</em>
        </h3>

        <p>{product.text}</p>
      </div>
    </article>
  );
}

/* =========================================================
   PRODUCTS
========================================================= */

function Products() {
  return (
    <section id="products" className="products">
      <div className="section-label">
        03 / PRODUCTS & QUALITY
      </div>

      <div className="products-heading">
        <span className="eyebrow">WHAT WE DELIVER</span>

        <h2>
          FRESH.
          <br />
          <em>CONSISTENT.</em>
        </h2>
      </div>

      <div className="products-list">
        {products.map((product, index) => (
          <ProductScene
            key={product.number}
            product={product}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   INFRASTRUCTURE
========================================================= */

function InfrastructureScene({ item, index }) {
  const scene = useRef(null);
  const media = useRef(null);
  const copy = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media.current,
        {
          opacity: 0,
          scale: 1.08,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scene.current,
            start: "top 90%",
            end: "top 55%",
            scrub: 0.8,
          },
        }
      );

      gsap.to(media.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: scene.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        copy.current,
        {
          opacity: 0,
          x: index % 2 === 0 ? -70 : 70,
        },
        {
          opacity: 1,
          x: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scene.current,
            start: "top 65%",
            end: "center 45%",
            scrub: 0.8,
          },
        }
      );
    }, scene);

    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={scene}
      className={`infra-scene ${
        index % 2 ? "infra-reverse" : ""
      }`}
    >
      <div ref={media} className="infra-media">
        <Video src={item.video} />
      </div>

      <div className="infra-shade" />

      <div ref={copy} className="infra-copy">
        <span className="infra-number">
          {item.number}
        </span>

        <span className="eyebrow">
          INFRASTRUCTURE
        </span>

        <h3>{item.title}</h3>

        <p>{item.text}</p>
      </div>
    </article>
  );
}

function Infrastructure() {
  return (
    <section
      id="infrastructure"
      className="infrastructure"
    >
      <div className="section-label">
        04 / INFRASTRUCTURE
      </div>

      <div className="infra-heading">
        <span className="eyebrow">
          BUILT FOR THE JOURNEY
        </span>

        <h2>
          PEOPLE.
          <br />
          PROCESS.
          <br />
          <em>PRECISION.</em>
        </h2>
      </div>

      <div className="infra-list">
        {infrastructure.map((item, index) => (
          <InfrastructureScene
            key={item.number}
            item={item}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   GLOBAL
========================================================= */

function Global() {
  const section = useRef(null);
  const title = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 70%",
            end: "center 45%",
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="global" className="global">
      <div className="global-media">
        <Video src="/assets/global/global.mp4" />
      </div>

      <div className="global-overlay" />

      <div ref={title} className="global-content">
        <span className="section-label">
          05 / GLOBAL PRESENCE
        </span>

        <span className="eyebrow">
          FROM MEXICO
        </span>

        <h2>
          TO THE
          <br />
          <em>WORLD.</em>
        </h2>

        <p>
          Connecting fresh produce with
          markets beyond borders.
        </p>

        <div className="global-route">
          <span>MEXICO</span>
          <i />
          <span>USA</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-label">
        06 / CONTACT
      </div>

      <div className="contact-content">
        <span className="eyebrow">
          LET'S MOVE FORWARD
        </span>

        <h2>
          LET'S
          <br />
          <em>TALK.</em>
        </h2>

        <a href="mailto:hello@sanreyproduce.com">
          hello@sanreyproduce.com
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>SAN REY</strong>
        <span>PRODUCE</span>
      </div>

      <div>
        FRESHNESS THAT TRAVELS.
      </div>

      <div>
        © {new Date().getFullYear()} SAN REY PRODUCE
      </div>
    </footer>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refresh);

    const timer = setTimeout(refresh, 800);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Manifesto />
        <Products />
        <Infrastructure />
        <Global />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

/* =========================================================
   RENDER
========================================================= */

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
