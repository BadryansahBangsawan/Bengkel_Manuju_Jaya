"use client";

import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Workflow from "@/components/sections/workflow";
import Advantages from "@/components/sections/advantages";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((element) => observer.observe(element));

    return () => {
      animatedElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <Workflow />
      <Advantages />
      <Contact />
      <Footer />
    </div>
  );
}
