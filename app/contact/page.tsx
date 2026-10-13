import { Metadata } from "next";
import ContactPageView from "@/components/ContactPageView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | Mangalore Tours & Travel Guide",
  description:
    "Get in touch with Mangalore Tours. We're here to help you plan your ideal coastal Karnataka holiday, beach getaways, temple circuits, sightseeing, and custom tour packages.",
};

export default function ContactPage() {
  return <ContactPageView />;
}
