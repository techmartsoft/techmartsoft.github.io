"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "#" },
      { label: "UI/UX Design", href: "#" },
      { label: "E-Commerce", href: "#" },
      { label: "Branding", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Footer Content Reveal
      gsap.fromTo(
        ".footer-reveal",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            once: true,
          },
          clearProps: "opacity,visibility,transform",
        },
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-background border-t-2 border-border"
    >
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30"
      />

      {/* Giant CTA Area */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-16 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="footer-reveal max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d31c31]">
              Ready to start?
            </p>
            <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-6xl md:text-8xl">
              Let&apos;s create <br />
              <span className="text-[#d31c31]">impact.</span>
            </h2>
          </div>

          <div className="footer-reveal">
            <Link
              href="#contact"
              className="group flex h-16 w-16 items-center justify-center bg-[#d31c31] text-white transition-all duration-300 hover:-translate-y-2 hover:translate-x-2 hover:shadow-[-6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[-6px_6px_0px_rgba(255,255,255,1)] sm:h-20 sm:w-20"
            >
              <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>

      {/* Links & Contact Info */}
      <div className="relative z-10 border-t-2 border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Brand Info (Left) */}
            <div className="footer-reveal lg:col-span-4">
              <Link
                href="/"
                className="group flex items-center gap-3 tracking-tight"
              >
                {/* Theme-Toggling Logo */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                  {mounted && (
                    <>
                      {/* Dark Logo (Visible in Light Mode) */}
                      <Image
                        src="/logo-dark.svg"
                        alt="Tech Mart Soft Logo"
                        width={80}
                        height={80}
                        className="absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-out 
                          dark:opacity-0 dark:scale-90 dark:rotate-[-10deg] opacity-100 scale-100 rotate-0"
                      />
                      {/* Light Logo (Visible in Dark Mode) */}
                      <Image
                        src="/logo-light.svg"
                        alt="Tech Mart Soft Logo"
                        width={80}
                        height={80}
                        className="absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-out 
                          dark:opacity-100 dark:scale-100 dark:rotate-0 opacity-0 scale-90 rotate-[10deg]"
                      />
                    </>
                  )}
                </div>

                <div className="flex flex-col leading-none">
                  <span className="font-black text-lg text-foreground tracking-widest">
                    TECH MART SOFT
                  </span>
                  <span className="text-[0.6rem] text-muted-foreground tracking-[0.2em] font-medium mt-1">
                    DIGITAL SOLUTIONS
                  </span>
                </div>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
                A digital solutions company helping businesses thrive in the
                modern age. We build high-performance web and mobile
                experiences.
              </p>

              <div className="mt-8 flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center border-2 border-border bg-background text-muted-foreground transition-colors hover:border-[#d31c31] hover:bg-[#d31c31] hover:text-white"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center border-2 border-border bg-background text-muted-foreground transition-colors hover:border-[#d31c31] hover:bg-[#d31c31] hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://techmartsoft.github.io"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center border-2 border-border bg-background text-muted-foreground transition-colors hover:border-[#d31c31] hover:bg-[#d31c31] hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>

            {/* Links Columns (Right) */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
              {footerLinks.map((section) => (
                <div key={section.title} className="footer-reveal">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-[#d31c31]"
                        >
                          <span className="h-px w-0 bg-[#d31c31] transition-all duration-300 group-hover:w-3" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t-2 border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:px-10 lg:px-16">
          <p>
            © {new Date().getFullYear()} Tech Mart Soft. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@techmartsoft.com"
              className="flex items-center gap-2 font-bold uppercase tracking-wider transition-colors hover:text-[#d31c31]"
            >
              <Mail className="h-3 w-3" />
              hello@techmartsoft.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
