"use client";

import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenuButton from "./mobileMenuButton";

function formatHour(hour) {
  if (hour === 0) return "Midnight";
  if (hour === 12) return "Noon";
  if (hour < 12) return `${hour}am`;
  return `${hour - 12}pm`;
}

function formatDays(days) {
  if (days.length === 7) return "Seven Days a Week";
  return days.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ");
}

function isOpenNow(openTime, closeTime, days) {
  const now = new Date();
  const dallas = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Chicago" }),
  );
  const hour = dallas.getHours();
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = dayNames[dallas.getDay()];

  if (!days.includes(today)) return false;

  if (closeTime === 0) {
    return hour >= openTime;
  } else if (closeTime < openTime) {
    return hour >= openTime || hour < closeTime;
  } else {
    return hour >= openTime && hour < closeTime;
  }
}

export default function Header({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const check = () =>
      setIsOpen(
        isOpenNow(data.hours.openTime, data.hours.closeTime, data.hours.days),
      );
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [data.hours]);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoWidth = Math.round(575 - (575 - 200) * progress);
  const fontSize = Math.round((80 - (80 - 14) * progress) * 10) / 10;
  const mobileFontSize = Math.max(0, Math.round((36 - 36 * Math.min(1, progress * 2)) * 10) / 10);
  const mobileFontRatio = Math.max(0, Math.round((1 - progress * 2) * 100) / 100);
  const mobileInfoSize = Math.max(0, Math.round((16 - 16 * progress) * 10) / 10);
  const mobileInfoOpacity = Math.max(0, Math.round((1 - progress * 2) * 100) / 100);
  const gap = Math.round((20 - 10 * progress) * 10) / 10;
  const logoHeight = Math.round((108 - (108 - 38) * progress) * 10) / 10;
  const contentWidth = Math.round(1350 - (1350 - 330) * progress);
  const contentPb = Math.round(30 * progress * 10) / 10;
  const mobilePt = Math.round(16 * progress * 10) / 10;

  const timeDisplay = `${formatHour(data.hours.openTime)} to ${formatHour(data.hours.closeTime)}`;
  const daysDisplay = formatDays(data.hours.days);

  return (
    <header className="masthead p25 flex flex-col gap-20 m-p16 m-gap-15" style={{ "--logo-width": `${logoWidth}px`, "--logo-height": `${logoHeight}px`, "--font-size": `${fontSize}px`, "--mobile-font-size": `${mobileFontSize}px`, "--mobile-font-ratio": mobileFontRatio, "--gap": `${gap}px`, "--content-width": `${contentWidth}px`, "--content-pb": `${contentPb}px`, "--mobile-info-size": `${mobileInfoSize}px`, "--mobile-info-opacity": mobileInfoOpacity, "--mobile-pt": `${mobilePt}px` }}>
      {progress >= 1 && <MobileMenuButton />}
      <div className="flex space-between">
        <Link href="/" className="logo ratio-16-3 pos-rel overflow">
          <div className="logo-mask" style={{ maskImage: `url(${urlFor(data.logo).url()})`, WebkitMaskImage: `url(${urlFor(data.logo).url()})` }} />
        </Link>
        <Link className="button-primary m-hide" href={data.reservation.reservationLink}>{data.reservation.reservationText}</Link>
      </div>
      <p className={`content f-80 max-1350${mobileFontSize <= 0 ? " m-hidden" : ""}${progress < 1 ? " editorial-new" : ""}`}>{data.content}</p>
      <div className={`flex gap-20 header-info${mobileInfoSize <= 0 ? " m-hidden" : ""}`}>
        <div>
          <p className="bold">{timeDisplay}</p>
          <p className="bold">{daysDisplay}</p>
          <p>{isOpen ? "Open Now" : "Closed Now"}</p>
        </div>
        <div>
          <p>{data.phone}</p>
          <p>{data.address}</p>
          <p>{data.handle}</p>
        </div>
      </div>
    </header>
  );
}
