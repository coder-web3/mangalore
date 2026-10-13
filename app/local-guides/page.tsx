import { Metadata } from "next";
import Header from "@/components/Header";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GuidesClientWrapper from "@/components/GuidesClientWrapper";
import { getGuidesData } from "@/lib/cms-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Local Guides in Mangalore | Certified Native Tour Storytellers",
  description:
    "Book verified Mangalore local guides for temple heritage walks, coastal watersports, authentic Tuluva culinary trails and wildlife tours. Fluent in Kannada, Tulu, English and Hindi.",
  keywords: [
    "Mangalore local guides",
    "Mangalore tour guide",
    "Kadri temple guide",
    "Tulu food tour",
    "Mangalore sightseeing guides",
    "hire guide in Mangalore",
  ],
  openGraph: {
    title: "Mangalore Local Guides | Certified Native Tour Storytellers",
    description:
      "Explore Mangalore with verified local experts. Heritage walks, coastal trails, and culinary tours with native Tuluva storytellers.",
    images: [
      {
        url: "/places-backdrop-clean-right.jpg",
        width: 1200,
        height: 630,
        alt: "Mangalore Local Guides",
      },
    ],
  },
};

export default async function LocalGuidesPage() {
  const guidesData = await getGuidesData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 overflow-x-clip">
        <GuidesClientWrapper guidesData={guidesData} />
        <TourEnquiryCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
