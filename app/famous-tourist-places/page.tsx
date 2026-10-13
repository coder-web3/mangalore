import { Metadata } from "next";
import Header from "@/components/Header";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PlacesClientWrapper from "@/components/PlacesClientWrapper";
import { getFamousPlacesData } from "@/lib/cms-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Famous Tourist Places in Mangalore | Iconic Sights & Top Attractions",
  description:
    "Discover the most famous tourist places in Mangalore — world-renowned beaches, ancient heritage temples, St. Aloysius Chapel, scenic viewpoints, and cultural wonders.",
};

export default async function FamousTouristPlacesPage() {
  const famousPlacesData = await getFamousPlacesData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 overflow-x-clip">
        <PlacesClientWrapper
          placesData={famousPlacesData}
          breadcrumbLabel="Famous Tourist Places"
        />
        <TourEnquiryCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
