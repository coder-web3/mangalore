import { Metadata } from "next";
import {
  getHomepageData,
  getPlacesData,
  getFamousPlacesData,
  getAboutData,
  getContactData,
  getGuidesData,
  getBlogDetailsData,
} from "@/lib/cms-server";
import AdminClient from "@/components/admin/AdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | Mangalore Tours CMS",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const [
    homepageData,
    placesData,
    famousPlacesData,
    aboutData,
    contactData,
    guidesData,
    blogDetailsData,
  ] = await Promise.all([
    getHomepageData(),
    getPlacesData(),
    getFamousPlacesData(),
    getAboutData(),
    getContactData(),
    getGuidesData(),
    getBlogDetailsData(),
  ]);

  return (
    <AdminClient
      initialHomepageData={homepageData}
      initialPlacesData={placesData}
      initialFamousPlacesData={famousPlacesData}
      initialAboutData={aboutData}
      initialContactData={contactData}
      initialGuidesData={guidesData}
      initialBlogDetailsData={blogDetailsData}
    />
  );
}
