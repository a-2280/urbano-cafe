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

  useEffect(() => {
    const check = () =>
      setIsOpen(
        isOpenNow(data.hours.openTime, data.hours.closeTime, data.hours.days),
      );
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [data.hours]);

  const timeDisplay = `${formatHour(data.hours.openTime)} to ${formatHour(data.hours.closeTime)}`;
  const daysDisplay = formatDays(data.hours.days);

  return (
    <header className="masthead p30 flex flex-col gap-20">
      <div className="flex space-between">
        <Link href="/" className="ratio-16-3 pos-rel w-575px overflow">
          <Image className="bg-image contain" src={urlFor(data.logo).url()} alt="Logo" width={575} height={102} />
        </Link>
        <Link className="button-primary" href={data.reservation.reservationLink}>{data.reservation.reservationText}</Link>
      </div>
      <p className="editorial-new f-80 max-1350">{data.content}</p>
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
