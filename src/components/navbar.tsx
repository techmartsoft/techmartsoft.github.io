"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const linksRef = useRef<HTMLUListElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navbar entrance animation
  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the active section
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveHash(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Animate the mobile menu
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isOpen) {
      gsap.to(menu, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
  }, [isOpen]);

  // Prevent background scrolling while the menu is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Close mobile menu when returning to desktop layout
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      if (media.matches) setIsOpen(false);
    };

    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#d31c31]/60 bg-background/95 py-2 shadow-lg backdrop-blur-xl"
          : "border-transparent bg-background/70 py-3 backdrop-blur-md sm:py-4"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          ref={logoRef}
          href="#home"
          onClick={() => setIsOpen(false)}
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          aria-label="Tech Mart Soft home"
        >
          <span className="relative h-16 w-24 md:h-22 md:w-28">
            {mounted && (
              <>
                <Image
                  src="/logo-dark.svg"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 36px, 56px"
                  className={`object-contain transition-all duration-300 ${
                    resolvedTheme === "dark"
                      ? "rotate-[-8deg] scale-90 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />

                <Image
                  src="/logo-light.svg"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 36px, 56px"
                  className={`object-contain transition-all duration-300 ${
                    resolvedTheme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "rotate-[8deg] scale-90 opacity-0"
                  }`}
                />
              </>
            )}
          </span>

          <span className=" min-w-0 flex-col leading-tight hidden md:flex">
            <span className="whitespace-nowrap text-[0.62rem] font-black tracking-[0.08em] text-foreground min-[380px]:text-xs sm:text-base sm:tracking-widest lg:text-xl">
              TECH MART SOFT
            </span>
            <span className="mt-1 hidden text-[0.6rem]   font-stretch-200% tracking-[0.7em]  text-muted-foreground sm:block lg:text-[0.65rem]">
              {`DIGITAL SOLUTIONS`}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul
          ref={linksRef}
          className="hidden items-center gap-4 lg:flex xl:gap-7"
        >
          {navLinks.map((link) => {
            const active = activeHash === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative whitespace-nowrap py-2 text-[0.68rem] font-bold uppercase tracking-wider transition-colors xl:text-xs ${
                    active
                      ? "text-[#d31c31]"
                      : "text-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-[#d31c31] transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          <ThemeToggle />

          <Button asChild className="hidden lg:inline-flex" variant="default">
            <Link href="#contact">Get Started</Link>
          </Button>

          {/* Mobile and tablet menu button */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 border-[#d31c31]/70 lg:hidden sm:h-10 sm:w-10"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        ref={mobileMenuRef}
        aria-hidden={!isOpen}
        className={`overflow-hidden border-t border-[#d31c31]/60 bg-background/98 backdrop-blur-xl lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ height: 0, opacity: 0 }}
      >
        <ul className="flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {navLinks.map((link) => {
            const active = activeHash === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-md border-l-4 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                    active
                      ? "border-[#d31c31] bg-[#d31c31]/10 text-[#d31c31]"
                      : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          <li className="pt-3">
            <Button asChild className="w-full" variant="default">
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                Get Started
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
