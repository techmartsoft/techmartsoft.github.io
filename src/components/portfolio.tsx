"use client";
import { Navbar } from "@/components/navbar";
import { Hero } from "./hero";
import ServicesPage from "./services";
import Projects from "./projects";
import ContactPage from "./contact-page";
import { Footer } from "./footer";

export function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-clip">
      <Navbar />
      <Hero />
      <ServicesPage />
      <Projects />
      <ContactPage />
      <Footer />
    </main>
  );
}
