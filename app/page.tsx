import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularDestinations from "@/components/PopularDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import TasteMangalore from "@/components/TasteMangalore";
import PlanTripCTA from "@/components/PlanTripCTA";
import MangaloreGallery from "@/components/MangaloreGallery";
import TourEnquiryCTA from "@/components/TourEnquiryCTA";
import ArtAndHistory from "@/components/ArtAndHistory";
import EventsSection from "@/components/EventsSection";
import ExploreMoreCTA from "@/components/ExploreMoreCTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getHomepageData } from "@/lib/cms-server";

// Ensure real-time updates when modified via admin dashboard
export const dynamic = "force-dynamic";

export default async function Home() {
  const cmsData = await getHomepageData().catch(() => null);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 overflow-x-clip">
        <HeroSection initialData={cmsData?.hero} />
        <PopularDestinations initialData={cmsData?.popularDestinations} />
        <WhyChooseUs initialData={cmsData?.whyChooseUs} />
        <TasteMangalore initialData={cmsData?.tasteMangalore} />
        <PlanTripCTA initialData={cmsData?.planTripCTA} />
        <MangaloreGallery />
        <TourEnquiryCTA initialData={cmsData?.tourEnquiryCTA} />
        <ArtAndHistory />
        <EventsSection />
        <ExploreMoreCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
