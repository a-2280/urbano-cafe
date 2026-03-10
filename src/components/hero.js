import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Music from "./music";

export default function Hero({ data }) {
  return (
    <div id="hero" className="h-100vh ratio-2-1 pos-rel overflow">
      <Image className="bg-image" src={urlFor(data.image).url()} alt="Background Image" width={1743} height={1347} />
      <Music />
    </div>
  );
}
