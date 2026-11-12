"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "techmartsoftaf@gmail.com",
    href: "mailto:techmartsoftaf@gmail.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+61 469818793",
    href: "tel:+61469818793",
  },
  
];

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance (ScrollTriggered)
      gsap.fromTo(
        ".contact-hero-reveal",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
          clearProps: "opacity,visibility,transform",
        },
      );

      // 2. Info Cards & Form Entrance
      gsap.fromTo(
        ".contact-card",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 75%",
            once: true,
          },
          clearProps: "opacity,visibility,transform",
        },
      );

      // 3. Input Focus Animations
      const inputs = section.querySelectorAll(".contact-input");
      inputs.forEach((input) => {
        const wrapper = input.closest(".input-wrapper");
        const label = wrapper?.querySelector(".input-label");

        if (label) {
          gsap.set(label, { x: 0, color: "var(--muted-foreground)" });

          input.addEventListener("focus", () => {
            gsap.to(label, { x: 4, color: "#d31c31", duration: 0.2 });
          });
          input.addEventListener("blur", () => {
            gsap.to(label, {
              x: 0,
              color: "var(--muted-foreground)",
              duration: 0.2,
            });
          });
        }
      });

      // 4. Magnetic Submit Button
      const btn = btnRef.current;
      if (btn && window.matchMedia("(pointer: fine)").matches) {
        const onMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        btn.addEventListener("mousemove", onMouseMove);
        btn.addEventListener("mouseleave", onMouseLeave);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = formRef.current;
  if (!form || isSubmitting) return;

  setIsSubmitting(true);
  setSubmitError(null);

  if (btnRef.current) {
    gsap.to(btnRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  }

  try {
    const formData = new FormData(form);
    formData.append(
  "access_key",
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!
);
    formData.append("from_name", "TechMart Website");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to send message."
      );
    }

    // Success animation
    const tl = gsap.timeline();

    tl.to(form, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        form.style.display = "none";
      },
    })
      .set(".success-message", { display: "flex" })
      .fromTo(
        ".success-message",
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
        }
      )
      .fromTo(
        ".success-element",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );

  } catch (error) {
    console.error("Contact form error:", error);

    setSubmitError(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <main
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background pt-24 text-foreground"
    >
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-size-[64px_64px] opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="contact-hero-reveal mb-6 inline-flex items-center gap-2 border-l-4 border-[#d31c31] bg-muted px-4 py-2 text-xs font-bold uppercase tracking-widest">
            Get in touch
          </div>
          <h1 className="contact-hero-reveal text-5xl font-black uppercase leading-[0.98] tracking-tighter sm:text-7xl lg:text-8xl">
            Let&apos;s build <br />
            <span className="text-[#d31c31]">something great.</span>
          </h1>
          <p className="contact-hero-reveal mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Have a project in mind or just want to say hello? Fill out the form
            below or reach out directly. We usually respond within 24 hours.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left Column: Contact Info */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  className="contact-card group relative flex flex-col justify-between overflow-hidden border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d31c31] hover:shadow-[6px_6px_0px_rgba(211,28,49,1)] sm:p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#d31c31]/10 text-[#d31c31] transition-colors group-hover:bg-[#d31c31] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {info.label}
                    </p>
                    <p className="text-lg font-black tracking-tight text-foreground group-hover:text-[#d31c31] transition-colors">
                      {info.value}
                    </p>
                  </div>
                  <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#d31c31] group-hover:opacity-100" />
                </a>
              );
            })}
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-card lg:col-span-3">
            <div className="relative overflow-hidden border-2 border-border bg-card p-6 sm:p-10 min-h-125 flex items-center">
              {/* Form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-full"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div className="input-wrapper flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="input-label text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Faiz"
                      className="contact-input h-12 w-full border-2 border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#d31c31] focus:outline-none transition-colors"
                    />
                  </div>
                  {/* Email */}
                  <div className="input-wrapper flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="input-label text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="contact-input h-12 w-full border-2 border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#d31c31] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="input-wrapper flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="input-label text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Project Inquiry"
                    className="contact-input h-12 w-full border-2 border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#d31c31] focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="input-wrapper flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="input-label text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="contact-input w-full resize-none border-2 border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#d31c31] focus:outline-none transition-colors"
                  />
                </div>
                {submitError && (
  <p role="alert" className="text-sm text-red-500">
    {submitError}
  </p>
)}

                {/* Submit Button */}
                <Button
                  ref={btnRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 h-14 w-full  bg-[#d31c31] text-base font-bold uppercase tracking-wider text-white hover:bg-[#b81729] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Success Message */}
              <div className="success-message hidden flex-col items-center justify-center py-12 text-center w-full absolute inset-0 bg-card">
                <div className="success-element mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#d31c31]/10 text-[#d31c31]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="success-element text-2xl font-black uppercase tracking-tight text-foreground">
                  Message Sent!
                </h3>
                <p className="success-element mt-3 max-w-sm text-sm text-muted-foreground">
                  Thank you for reaching out. We have received your message and
                  will get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="success-element mt-8 rounded-none border-2 px-6 font-bold uppercase tracking-wider hover:bg-[#d31c31] hover:text-white hover:border-[#d31c31] transition-colors"
                >
                  Send another message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
