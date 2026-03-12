import "../styles/site.scss";
import Lenis from "./providers";
import { SanityLive } from "@/sanity/lib/live";

export const metadata = {
  title: "Urbano Cafe",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SanityLive />
        <Lenis>
          {children}
        </Lenis>
      </body>
    </html>
  );
}
