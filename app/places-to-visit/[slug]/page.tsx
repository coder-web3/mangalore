import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlacesData } from "@/lib/cms-server";
import { getDefaultPlaceDetail } from "@/lib/cms";
import PlaceDetailPageView from "@/components/PlaceDetailPageView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const placesData = await getPlacesData();

  const detail =
    placesData.placeDetails?.[slug] ||
    (slug === "panambur-beach" ? placesData.panamburDetail : null);

  const matchedPlace = placesData.listingCatalog?.places?.find(
    (p) => p.slug === slug || p.id === slug
  );

  const titleName =
    detail?.hero?.title && detail?.hero?.titleHighlight
      ? `${detail.hero.title} ${detail.hero.titleHighlight}`
      : matchedPlace?.name || "Attraction";

  return {
    title: `${titleName} Mangalore | Travel Guide, Timings & Highlights`,
    description:
      detail?.hero?.description ||
      `Complete travel guide for ${titleName} in Mangalore — overview, travel facts, timings, photos, and top things to do.`,
  };
}

export default async function DynamicPlaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const placesData = await getPlacesData();

  let detail =
    placesData.placeDetails?.[slug] ||
    (slug === "panambur-beach" ? placesData.panamburDetail : null);

  if (!detail) {
    const matchedPlace = placesData.listingCatalog?.places?.find(
      (p) => p.slug === slug || p.id === slug
    );

    if (matchedPlace) {
      detail = getDefaultPlaceDetail(matchedPlace);
    } else {
      notFound();
    }
  }

  return <PlaceDetailPageView detail={detail} slug={slug} />;
}
