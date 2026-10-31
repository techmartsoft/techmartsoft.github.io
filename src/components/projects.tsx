"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Layers3,
} from "lucide-react";

import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    number: "01",
    title: "Digital Experiences",
    category: "Web & Apps",
    type: "Web & Apps",
    description:
      "Responsive websites and web applications built around usability and performance.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    image: "/projects/web-project.jpg",
    year: "2026",
  },
  {
    number: "02",
    title: "Brand Identity",
    category: "Logo Design",
    type: "Logo Design",
    description:
      "Distinctive logo concepts and visual identities designed to make brands recognizable.",
    tech: ["Wordmark", "Monogram", "Branding"],
    image: "/projects/logo-project.jpg",
    year: "2026",
  },
  {
    number: "03",
    title: "Campaign Posters",
    category: "Posters & Graphics",
    type: "Posters & Graphics",
    description:
      "Bold promotional posters and graphic designs for campaigns, products, and events.",
    tech: ["Typography", "Composition", "Print Design"],
    image: "/projects/poster-project.jpg",
    year: "2026",
  },
  {
    number: "04",
    title: "Creative Artwork",
    category: "Artwork",
    type: "Artwork",
    description:
      "Original digital artwork and illustrations combining visual storytelling with creative expression.",
    tech: ["Digital Art", "Illustration", "Visual Design"],
    image: "/projects/artwork-project.jpg",
    year: "2026",
  },
  {
    number: "05",
    title: "Interface Design",
    category: "UI/UX Design",
    type: "UI/UX Design",
    description:
      "Thoughtful interface layouts and user experiences for websites and digital products.",
    tech: ["Figma", "Prototyping", "Design Systems"],
    image: "/projects/ui-project.jpg",
    year: "2026",
  },
];

const filters = [
  "All",
  "Web & Apps",
  "Logo Design",
  "Posters & Graphics",
  "Artwork",
  "UI/UX Design",
];

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.type === activeFilter);

  // 1. Initial Page Load Animations (Hero & Reveal)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Hero Stagger
      gsap.fromTo(
        ".hero-reveal",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
        },
      );

      // Parallax Hero
      gsap.to(".hero-content", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 2. Filter Animation (Runs when activeFilter changes)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll(".project-card");

      // Fade in new cards
      gsap.fromTo(
        cards,
        { y: 20, scale: 0.95, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    }, grid);

    return () => ctx.revert();
  }, [activeFilter]);

  // 3. Magnetic Hover Effect for Cards
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !window.matchMedia("(pointer: fine)").matches) return;

    const cards = grid.querySelectorAll(".project-card");

    const onMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Very subtle 3D tilt
      gsap.to(card, {
        rotateX: -y * 0.02,
        rotateY: x * 0.02,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", onMouseMove as EventListener);
      card.addEventListener("mouseleave", onMouseLeave as EventListener);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", onMouseMove as EventListener);
        card.removeEventListener("mouseleave", onMouseLeave as EventListener);
      });
    };
  }, [filteredProjects]); // Re-attach when filter changes

  // Helper: Button Click Press Effect
  const handleFilterClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    filter: string,
  ) => {
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.92 },
      { scale: 1, duration: 0.4, ease: "back.out(3)" },
    );
    setActiveFilter(filter);
  };

  return (
    <main
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Hero */}
      <section
        id="projects"
        className="hero-section relative border-b border-border"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-size-[64px_64px] opacity-40"
        />

        <div className="hero-content relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:px-10 sm:pb-28 sm:pt-32 lg:px-16">
          <div className="hero-reveal mb-7 inline-flex items-center gap-2 border-l-4 border-[#d31c31] bg-muted px-4 py-2 text-xs font-bold uppercase tracking-widest">
            Selected Work
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <h1 className="hero-reveal text-5xl font-black uppercase leading-[0.98] tracking-tighter sm:text-7xl lg:text-8xl">
                Ideas into
                <br />
                <span className="text-[#d31c31]">Experiences.</span>
              </h1>

              <p className="hero-reveal mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Explore digital product concepts, interfaces, and web
                experiences shaped around usability, performance, and purposeful
                design.
              </p>
            </div>

            <div className="hero-reveal flex items-center gap-3 text-sm font-semibold uppercase tracking-wider">
              <Layers3 className="h-5 w-5 text-[#d31c31]" />
              <span>Design. Develop. Deliver.</span>
            </div>
          </div>

          <a
            href="#work"
            className="hero-reveal mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-[#d31c31]"
          >
            Explore our work
            <ArrowDownRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Project gallery */}
      <section
        id="work"
        className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
      >
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d31c31]">
              The portfolio
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
              Selected projects
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            A collection of project concepts across web development, mobile
            experiences, and digital design.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const selected = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={(e) => handleFilterClick(e, filter)}
                aria-pressed={selected}
                className={`border px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  selected
                    ? "border-[#d31c31] bg-[#d31c31] text-white"
                    : "border-border bg-background text-muted-foreground hover:border-[#d31c31] hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Responsive grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.number}
              className={`project-card group flex min-w-0 flex-col overflow-hidden border-2 border-border bg-card transition-all duration-300 hover:border-[#d31c31] hover:shadow-[7px_7px_0px_rgba(211,28,49,1)] ${
                index === 0 && activeFilter === "All" ? "md:col-span-2" : ""
              }`}
            >
              {/* Project image */}
              <div
                className={`relative overflow-hidden bg-muted ${
                  index === 0 && activeFilter === "All"
                    ? "aspect-16/8"
                    : "aspect-16/10"
                }`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" />

                <span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground">
                  {project.category}
                </span>

                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-[#d31c31] text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              {/* Project details */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    PROJECT / {project.number}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="bg-muted px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No projects found in this category.
          </p>
        )}
      </section>
    </main>
  );
}
