"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Layers3,
  Sparkles,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".hero-eyebrow", {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          clearProps: "all",
        })
        .from(
          ".hero-title",
          {
            y: 35,
            autoAlpha: 0,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.25",
        )
        .from(
          ".hero-description",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.6,
            clearProps: "all",
          },
          "-=0.4",
        )
        .from(
          ".hero-action",
          {
            y: 15,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.12,
            clearProps: "all",
          },
          "-=0.25",
        )
        .from(
          ".hero-visual",
          {
            x: 25,
            autoAlpha: 0,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.4",
        )
        .from(
          ".hero-stat",
          {
            y: 12,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.4,
            clearProps: "all",
          },
          "-=0.3",
        );

      gsap.to(".hero-orb", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate flex min-h-svh scroll-mt-20 items-center overflow-hidden bg-background px-4 pb-16 pt-28 text-foreground sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-size-[42px_42px] opacity-40 mask-[linear-gradient(to_bottom,black,transparent_85%)] sm:bg-size-[56px_56px]" />

        <div className="hero-orb absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#d31c31]/10 blur-[100px] sm:h-96 sm:w-96" />

        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#d31c31]/5 blur-[100px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
        {/* Left: Text content */}
        <div className="relative z-10 max-w-2xl">
          <div className="hero-eyebrow mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-[#d31c31]/30 bg-[#d31c31]/5 px-3 py-2 sm:px-4">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d31c31] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d31c31]" />
            </span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.13em] text-foreground sm:text-xs sm:tracking-[0.18em]">
              TECH MART SOFT / DIGITAL SOLUTIONS
            </span>
          </div>

          <h1 className="hero-title text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            We build digital
            <br />
            experiences that
            <br />
            <span className="relative inline-block text-[#d31c31]">
              move you forward.
              <span className="absolute -bottom-1 left-0 h-1 w-2/3 rounded-full bg-[#d31c31]/30 sm:-bottom-2 sm:h-1.5" />
            </span>
          </h1>

          <p className="hero-description mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
            We turn bold ideas into modern websites, powerful applications, and
            thoughtful digital experiences that help businesses grow.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              asChild
              size="lg"
              className="hero-action group h-12 w-full bg-[#d31c31] px-6 text-white hover:bg-[#b91629] sm:w-auto"
            >
              <Link
                href="#projects"
                className="flex justify-center items-center"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="hero-action h-12 w-full border-border px-6 sm:w-auto"
            >
              <Link href="#contact">Let&apos;s Talk</Link>
            </Button>
          </div>

          {/* Small trust points */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6 sm:mt-12 sm:gap-x-7">
            <div className="hero-stat flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <Code2 className="h-4 w-4 text-[#d31c31]" />
              Clean development
            </div>

            <div className="hero-stat flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <Layers3 className="h-4 w-4 text-[#d31c31]" />
              Modern solutions
            </div>
          </div>
        </div>

        {/* Right: Decorative code interface */}
        <div className="hero-visual relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -inset-5 rounded-4xl bg-[#d31c31]/5 blur-2xl sm:-inset-8" />

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl shadow-black/10 backdrop-blur-xl">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d31c31]" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Terminal className="h-3.5 w-3.5" />
                <span>creative-workspace.tsx</span>
              </div>

              <Code2 className="h-4 w-4 text-[#d31c31]" />
            </div>

            {/* Code panel */}
            <div className="space-y-5 p-5 sm:space-y-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    OUR APPROACH
                  </p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                    Ideas into reality.
                  </h2>
                </div>

                <div className="hero-orb flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d31c31]/10 text-[#d31c31] sm:h-14 sm:w-14">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border bg-background p-4 font-mono text-xs leading-7 sm:p-5 sm:text-sm">
                <p className="text-muted-foreground">
                  <span className="text-[#d31c31]">01</span>
                  {"  "}const vision = {"{"}
                </p>
                <p className="pl-5 text-muted-foreground">
                  design:{" "}
                  <span className="text-foreground">
                    &quot;Purposeful&quot;
                  </span>
                  ,
                </p>
                <p className="pl-5 text-muted-foreground">
                  technology:{" "}
                  <span className="text-foreground">&quot;Modern&quot;</span>,
                </p>
                <p className="pl-5 text-muted-foreground">
                  experience:{" "}
                  <span className="text-[#d31c31]">
                    &quot;Exceptional&quot;
                  </span>
                </p>
                <p className="text-muted-foreground">{"};"}</p>

                <div className="my-3 h-px bg-border" />

                <p className="text-muted-foreground">
                  <span className="text-[#d31c31]">02</span>
                  {"  "}build(vision);
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#d31c31]/10 px-3 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#d31c31]" />
                  <span className="text-[0.68rem] font-semibold text-[#d31c31] sm:text-xs">
                    READY TO CREATE SOMETHING GREAT
                  </span>
                </div>
              </div>

              {/* Service chips */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { name: "Websites", icon: Code2 },
                  { name: "Apps", icon: Layers3 },
                  { name: "Ideas", icon: Sparkles },
                ].map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-3 text-[0.65rem] font-semibold text-muted-foreground transition-colors hover:border-[#d31c31]/50 hover:text-[#d31c31] sm:gap-2 sm:text-xs"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating label */}
          <div className="hero-orb absolute -right-2 -top-4 flex items-center gap-2 rounded-xl border border-border bg-background p-3 shadow-lg sm:-right-5 sm:top-8 sm:p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d31c31]/10 text-[#d31c31]">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold">Built with purpose</p>
              <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
                Design meets technology
              </p>
            </div>
          </div>

          {/* Bottom scroll hint */}
          <Link
            href="#services"
            className="z-10 mx-auto mt-8 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-[#d31c31]"
          >
            Discover more
            <ArrowDown className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
