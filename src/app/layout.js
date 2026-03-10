import "../styles/site.scss";
import Lenis from "./providers";

export const metadata = {
  title: "Urbano Cafe",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Lenis>
          {children}
        </Lenis>
      </body>
    </html>
  );
}
