"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useMobileMenu } from "./MobileMenuContext";
import MobileMenuCloseButton from "./mobileMenuCloseButton";
import MobileReserveButton from "./mobileReserveButton";
import Music from "./music";

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
  if (closeTime === 0) return hour >= openTime;
  if (closeTime < openTime) return hour >= openTime || hour < closeTime;
  return hour >= openTime && hour < closeTime;
}

export default function MobileMenu({ data }) {
  const { isOpen } = useMobileMenu();
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  useEffect(() => {
    if (!data?.hours) return;
    const check = () =>
      setIsOpenStatus(
        isOpenNow(data.hours.openTime, data.hours.closeTime, data.hours.days),
      );
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [data?.hours]);

  if (!isOpen || !data) return null;

  const timeDisplay = `${formatHour(data.hours.openTime)} to ${formatHour(data.hours.closeTime)}`;
  const daysDisplay = formatDays(data.hours.days);

  return (
    <div className="mobile-menu">
      <div className="flex flex-col gap-20">
        <div className="flex space-between">
          <div className="w-75 pos-rel ratio-16-3 overflow">
            <Link href="/">
              <div
                className="logo-mask bg-image"
                style={{
                  maskImage: `url(${urlFor(data.logo).url()})`,
                  WebkitMaskImage: `url(${urlFor(data.logo).url()})`,
                }}
              />
            </Link>
          </div>
          <MobileMenuCloseButton />
        </div>
        <p className="f-36 editorial-new">{data.content}</p>
        <div className="flex gap-40">
          <div>
            <p className="bold">{timeDisplay}</p>
            <p className="bold">{daysDisplay}</p>
            <p>{isOpenStatus ? "Open Now" : "Closed Now"}</p>
          </div>
          <div>
            <a href={data.phone?.link}>{data.phone?.title}</a>
            <p>{data.address}</p>
            <p>{data.handle}</p>
          </div>
        </div>
      </div>
      <div>
        <MobileReserveButton reservation={data.reservation} />
        <Music alwaysVisible />
      </div>
    </div>
  );
}
