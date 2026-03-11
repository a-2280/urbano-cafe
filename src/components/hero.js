import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Music from "./music";
import MobileReserveButton from "./mobileReserveButton";

export default function Hero({ data, reservation }) {
  return (
    <div id="hero" className="h-100vh pos-rel overflow">
      <Image className="bg-image" src={urlFor(data.image).url()} alt="Background Image" width={1743} height={1347} />
      <MobileReserveButton reservation={reservation} />
      <Music />
    </div>
  );
}
