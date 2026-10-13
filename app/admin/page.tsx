import { Metadata } from "next";
import {
  getHomepageData,
  getPlacesData,
  getAboutData,
  getContactData,
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
  const [homepageData, placesData, aboutData, contactData] = await Promise.all([
    getHomepageData(),
    getPlacesData(),
    getAboutData(),
    getContactData(),
  ]);

  return (
    <AdminClient
      initialHomepageData={homepageData}
      initialPlacesData={placesData}
      initialAboutData={aboutData}
      initialContactData={contactData}
    />
  );
}
