import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mangalore Tours | Explore the Real Mangalore",
  description:
    "From serene beaches and scenic hills to rich culture, history and delicious coastal cuisine — explore the best of Mangalore with curated tours, travel guides and local experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${caveat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
