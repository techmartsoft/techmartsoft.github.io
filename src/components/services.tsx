"use client";

import { useEffect, useRef } from "react";
import {
  Braces,
  Code2,
  LifeBuoy,
  Palette,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Layers3,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, scalable, and modern websites built around your business goals and your users.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    number: "02",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Clean interfaces and thoughtful user experiences that make your product easy to use.",
    tags: ["Wireframes", "Prototypes", "Design systems"],
  },
  {
    number: "03",
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description:
      "Online stores designed to showcase your products and make buying simple and seamless.",
    tags: ["Online stores", "Payments", "Integrations"],
  },
  {
    number: "04",
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Consistent, polished experiences that work beautifully across mobile, tablet, and desktop.",
    tags: ["Mobile-first", "Accessibility", "Performance"],
  },
  {
    number: "05",
    icon: Search,
    title: "SEO & Optimization",
    description:
      "Improve discoverability, loading speed, and technical foundations to help your site perform.",
    tags: ["Technical SEO", "Core Web Vitals", "Analytics"],
  },
  {
    number: "06",
    icon: LifeBuoy,
    title: "Maintenance & Support",
    description:
      "Keep your digital products secure, updated, and running smoothly as your business grows.",
    tags: ["Bug fixes", "Updates", "Monitoring"],
  },
  {
    number: "07",
    icon: Sparkles,
    title: "Logo Design & Branding",
    description:
      "Memorable logos, professional wordmarks, and distinctive brand identities that help businesses stand out.",
    tags: ["Logo design", "Brand identity", "Monograms"],
  },
  {
    number: "08",
    icon: Layers3,
    title: "Poster & Graphic Design",
    description:
      "Eye-catching posters and promotional graphics for businesses, events, campaigns, and social media.",
    tags: ["Posters", "Social graphics", "Typography"],
  },
  {
    number: "09",
    icon: Braces,
    title: "Digital Artwork & Illustration",
    description:
      "Original digital illustrations, creative compositions, and custom artwork that bring ideas to life.",
    tags: ["Digital art", "Illustration", "Visual concepts"],
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn about your business, audience, goals, and the problems you need to solve.",
  },
  {
    number: "02",
    title: "Plan & Design",
    description:
      "We define the structure, map the user journey, and shape the visual direction.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We turn the plan into a responsive, reliable, and polished digital experience.",
  },
  {
    number: "04",
    title: "Launch & Improve",
    description:
      "We test, launch, and help you refine your product as your needs evolve.",
  },
];

export default function ServicesPage() {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      // Animate section headings
      const headers = page.querySelectorAll(".animate-header");

      gsap.from(headers, {
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      // Animate service cards
      const cards = page.querySelectorAll(".service-card");

      gsap.from(cards, {
        y: 25,
        duration: 0.65,
        stagger: 0.07,
        delay: 0.15,
        ease: "power3.out",
        clearProps: "transform",
      });

      // Animate process steps
      const steps = page.querySelectorAll(".process-step");

      gsap.from(steps, {
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
        clearProps: "transform",
      });

      // Service card glow and icon interactions
      const cleanups: (() => void)[] = [];

      if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach((card) => {
          const glow = card.querySelector(".card-glow");
          const icon = card.querySelector(".service-icon");

          if (glow) {
            const onMouseMove = (e: Event) => {
              const mouse = e as MouseEvent;
              const rect = card.getBoundingClientRect();

              gsap.to(glow, {
                x: mouse.clientX - rect.left - 100,
                y: mouse.clientY - rect.top - 100,
                duration: 0.5,
                ease: "power2.out",
              });
            };

            card.addEventListener("mousemove", onMouseMove);

            cleanups.push(() => {
              card.removeEventListener("mousemove", onMouseMove);
            });
          }

          if (icon) {
            const enter = () => {
              gsap.to(icon, {
                scale: 1.12,
                rotate: -5,
                duration: 0.3,
                ease: "back.out(2)",
              });
            };

            const leave = () => {
              gsap.to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            card.addEventListener("mouseenter", enter);
            card.addEventListener("mouseleave", leave);

            cleanups.push(() => {
              card.removeEventListener("mouseenter", enter);
              card.removeEventListener("mouseleave", leave);
            });
          }
        });
      }

      // Save event-listener cleanup
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-size-[64px_64px] opacity-40"
      />

      {/* Services grid */}
      <section
        id="services"
        className="relative border-t border-border bg-muted/20"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="animate-header mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d31c31]">
                Our expertise
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
                Everything you need
                <br className="hidden sm:block" /> to move forward.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Flexible digital solutions, tailored to your goals — whether you
              are launching something new or improving what you already have.
            </p>
          </div>

          <div className="services-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="service-card group relative flex min-h-75 flex-col overflow-hidden rounded-md border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d31c31] hover:shadow-[8px_8px_0px_rgba(211,28,49,0.2)] sm:p-8"
                >
                  {/* Animated Magnetic Glow */}
                  <div
                    className="card-glow pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#d31c31]/10 opacity-0 blur-[60px] transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 mb-8 flex items-start justify-between">
                    <div className="service-icon flex h-12 w-12 items-center justify-center rounded-md border-2 border-[#d31c31]/20 bg-[#d31c31]/10 text-[#d31c31] transition-colors duration-300 group-hover:bg-[#d31c31] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="font-mono text-sm font-bold tracking-wider text-muted-foreground/40">
                      /{service.number}
                    </span>
                  </div>

                  <h3 className="relative z-10 text-xl font-black uppercase tracking-tight">
                    {service.title}
                  </h3>

                  <p className="relative z-10 mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-border bg-background px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-[#d31c31]/30 group-hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="animate-header mb-14 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d31c31]">
              How we work
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
              A clear process.
              <br />
              No complexity.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Good results come from clear communication, thoughtful planning,
              and getting the details right at every stage.
            </p>
          </div>

          <div className="process-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div
                key={step.number}
                className="process-step border-t-2 border-border pt-5 transition-colors hover:border-[#d31c31]"
              >
                <span className="font-mono text-sm font-bold tracking-wider text-[#d31c31]">
                  STEP {step.number}
                </span>
                <h3 className="mt-5 text-xl font-black uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
