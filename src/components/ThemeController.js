"use client";

import { useEffect } from "react";
import gsap from "gsap";

const TRIGGER = 0.15; // 15% of viewport

export default function ThemeController() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = [...document.querySelectorAll("[data-theme]")];
    let activeTheme = null;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const activateTheme = (el) => {
      const next = el.dataset.theme;
      if (next === activeTheme) return;
      activeTheme = next;
      root.dataset.activeTheme = next;
      const styles = getComputedStyle(el);
      gsap.to(root, {
        "--active-theme-bg": styles.getPropertyValue("--theme-bg").trim(),
        "--active-theme-text": styles.getPropertyValue("--theme-text").trim(),
        duration: 1,
        ease: "power2.inOut",
        overwrite: true,
      });
    };

    const checkTheme = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollingDown = scrollY >= lastScrollY;
      lastScrollY = scrollY;

      let active = null;

      if (scrollingDown) {
        // Switch to a section when its top crosses the bottom TRIGGER% of the viewport
        for (let i = sections.length - 1; i >= 0; i--) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= vh * (1 - TRIGGER)) {
            active = sections[i];
            break;
          }
        }
      } else {
        // Switch to a section when its bottom crosses the top TRIGGER% of the viewport
        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.bottom >= vh * TRIGGER) {
            active = sections[i];
            break;
          }
        }
      }

      if (active) activateTheme(active);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkTheme);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    checkTheme();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
