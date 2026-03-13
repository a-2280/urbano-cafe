"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

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

export default function Footer({ data, siteInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsOpen(
        isOpenNow(
          siteInfo.hours.openTime,
          siteInfo.hours.closeTime,
          siteInfo.hours.days,
        ),
      );
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [siteInfo.hours]);

  const timeDisplay = `${formatHour(siteInfo.hours.openTime)} to ${formatHour(siteInfo.hours.closeTime)}`;
  const daysDisplay = formatDays(siteInfo.hours.days);

  return (
    <footer className="p25 theme-footer" data-theme="footer">
      <div className="flex flex-col align-center gap-30 py-330px m-py-200px">
        <p className="f-title uppercase">{data.title}</p>
        <div className="flex flex-col align-center gap-7">
          {data.pressLinks.map((link, i) => (
            <Link key={i} href={link.link} className="f-64 editorial-new z-110">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <p className="max-300 pb-70px m-show">{data.description}</p>
        <div className="flex gap-20 space-between pb-60px m-pb-15px">
          <div className="flex-1 flex gap-20 m-gap-40">
            <div className="m-hide">
              <p className="bold">{timeDisplay}</p>
              <p className="bold">{daysDisplay}</p>
              <p>{isOpen ? "Open Now" : "Closed Now"}</p>
            </div>
            <div>
              <p>{siteInfo.phone}</p>
              <p>{siteInfo.address}</p>
              <p>{siteInfo.handle}</p>
            </div>
            <div className="flex flex-col">
              <Link className="bold" href={data.instagramLink}>
                Instagram
              </Link>
              <Link className="bold" href={data.tiktokLink}>
                Tik-tok
              </Link>
            </div>
          </div>
          <p className="max-300 text-center m-hide">{data.description}</p>
          <p className="flex-1 bold flex justify-end m-hide">
            {data.copyright}
          </p>
        </div>
        <div className="logo ratio-16-3 pos-rel overflow">
          <div className="logo-mask" style={{ maskImage: `url(${urlFor(siteInfo.logo).url()})`, WebkitMaskImage: `url(${urlFor(siteInfo.logo).url()})` }} />
        </div>
        <p className="flex-1 bold flex justify-end pt-15px m-show">{data.copyright}</p>
      </div>
    </footer>
  );
}
