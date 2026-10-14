import { MetadataRoute } from "next";
import {
  getPlacesData,
  getFamousPlacesData,
  getGuidesData,
  getBlogDetailsData,
} from "@/lib/cms-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mangaloretours.com";

  // Static Public Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/places-to-visit`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/famous-tourist-places`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/local-guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic Place Detail Pages
  try {
    const placesData = await getPlacesData();
    const placeRoutes: MetadataRoute.Sitemap = (
      placesData.listingCatalog?.places || []
    )
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${baseUrl}/places-to-visit/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    // Dynamic Famous Tourist Place Detail Pages
    const famousPlacesData = await getFamousPlacesData();
    const famousRoutes: MetadataRoute.Sitemap = (
      famousPlacesData.listingCatalog?.places || []
    )
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${baseUrl}/famous-tourist-places/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    // Dynamic Blog Post Detail Pages
    const blogDetails = await getBlogDetailsData();
    const blogRoutes: MetadataRoute.Sitemap = Object.keys(blogDetails).map(
      (slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    );

    return [...staticRoutes, ...placeRoutes, ...famousRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
