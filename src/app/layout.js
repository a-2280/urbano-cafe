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
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/fme3fbi.css" />
      </head>
      <body>
        <SanityLive />
        <Lenis>
          {children}
        </Lenis>
      </body>
    </html>
  );
}
