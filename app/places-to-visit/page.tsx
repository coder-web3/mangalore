import { Metadata } from "next";
import Header from "@/components/Header";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PlacesClientWrapper from "@/components/PlacesClientWrapper";
import { getPlacesData } from "@/lib/cms-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tourist Places in Mangalore | Beaches, Temples, Heritage & Viewpoints",
  description:
    "Explore the top tourist places to visit in Mangalore — iconic beaches, ancient temples, rivers, scenic hills and cultural heritage attractions.",
};

export default async function PlacesToVisitPage() {
  const placesData = await getPlacesData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 overflow-x-clip">
        <PlacesClientWrapper placesData={placesData} />
        <TourEnquiryCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
