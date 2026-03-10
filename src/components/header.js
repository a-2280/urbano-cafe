"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  const gap = Math.round((20 - 10 * progress) * 10) / 10;
  const logoHeight = Math.round((108 - (108 - 38) * progress) * 10) / 10;
  const contentWidth = Math.round(1350 - (1350 - 330) * progress);
  const contentPb = Math.round(30 * progress * 10) / 10;

  const timeDisplay = `${formatHour(data.hours.openTime)} to ${formatHour(data.hours.closeTime)}`;
  const daysDisplay = formatDays(data.hours.days);

  return (
    <header className="masthead p25 flex flex-col gap-20" style={{ "--logo-width": `${logoWidth}px`, "--logo-height": `${logoHeight}px`, "--font-size": `${fontSize}px`, "--gap": `${gap}px`, "--content-width": `${contentWidth}px`, "--content-pb": `${contentPb}px` }}>
      <div className="flex space-between">
        <Link href="/" className="logo ratio-16-3 pos-rel overflow">
          <Image className="bg-image contain" src={urlFor(data.logo).url()} alt="Logo" width={575} height={102} />
        </Link>
        <Link className="button-primary" href={data.reservation.reservationLink}>{data.reservation.reservationText}</Link>
      </div>
      <p className={`content f-80 max-1350${progress < 1 ? " editorial-new" : ""}`}>{data.content}</p>
      <div className="flex gap-20">
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
