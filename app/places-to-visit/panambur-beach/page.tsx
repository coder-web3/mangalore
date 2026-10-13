import { Metadata } from "next";
import PlaceDetailPageView from "@/components/PlaceDetailPageView";
import { getPlacesData } from "@/lib/cms-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panambur Beach Mangalore | Timings, Water Sports & Travel Guide",
  description:
    "Complete travel guide for Panambur Beach Mangalore — famous for golden sunsets, thrilling water sports, jet skiing, kite festival, camel rides, and clean coastlines.",
};

export default async function PanamburBeachDetailPage() {
  const placesData = await getPlacesData();
  const detail =
    placesData.placeDetails?.["panambur-beach"] || placesData.panamburDetail;

  return <PlaceDetailPageView detail={detail} slug="panambur-beach" />;
}
