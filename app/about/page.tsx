import { Metadata } from "next";
import AboutPageView from "@/components/AboutPageView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Mangalore Tours — Discover the Real Mangalore",
  description:
    "Learn about Mangalore Tours. We are passionate about showcasing the beauty, heritage, beaches, and local stories of Mangalore, Karnataka.",
};

export default function AboutPage() {
  return <AboutPageView />;
}
