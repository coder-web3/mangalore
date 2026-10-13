import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFamousPlacesData } from "@/lib/cms-server";
import { getDefaultPlaceDetail } from "@/lib/cms";
import PlaceDetailPageView from "@/components/PlaceDetailPageView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const famousPlacesData = await getFamousPlacesData();

  const detail =
    famousPlacesData.placeDetails?.[slug] ||
    (slug === "panambur-beach" ? famousPlacesData.panamburDetail : null);

  const matchedPlace = famousPlacesData.listingCatalog?.places?.find(
    (p) => p.slug === slug || p.id === slug
  );

  const titleName =
    detail?.hero?.title && detail?.hero?.titleHighlight
      ? `${detail.hero.title} ${detail.hero.titleHighlight}`
      : matchedPlace?.name || "Famous Attraction";

  return {
    title: `${titleName} Mangalore | Famous Tourist Spot, Timings & Highlights`,
    description:
      detail?.hero?.description ||
      `Complete travel guide for ${titleName} in Mangalore — overview, travel facts, timings, photos, and top things to do.`,
  };
}

export default async function FamousPlaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const famousPlacesData = await getFamousPlacesData();

  let detail =
    famousPlacesData.placeDetails?.[slug] ||
    (slug === "panambur-beach" ? famousPlacesData.panamburDetail : null);

  if (!detail) {
    const matchedPlace = famousPlacesData.listingCatalog?.places?.find(
      (p) => p.slug === slug || p.id === slug
    );

    if (matchedPlace) {
      detail = getDefaultPlaceDetail(matchedPlace);
    } else {
      notFound();
    }
  }

  return (
    <PlaceDetailPageView
      detail={detail}
      slug={slug}
      parentBreadcrumb={{
        label: "Famous Tourist Places",
        href: "/famous-tourist-places",
      }}
    />
  );
}
