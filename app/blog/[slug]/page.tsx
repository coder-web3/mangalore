import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getBlogDetailBySlug, getGuidesData } from "@/lib/cms-server";
import BlogDetailPageView from "@/components/BlogDetailPageView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogDetailBySlug(slug);

  if (!article) {
    return {
      title: "Blog Post Not Found | Mangalore Tours",
      description: "The requested travel article could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mangaloretours.com";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: `${article.title} | Mangalore Travel Guide & Blog`,
    description: article.subtitle || article.intro || `Read our complete travel story and guide: ${article.title}.`,
    keywords: [
      article.categoryLabel,
      "Mangalore Travel",
      "Mangalore Tourism",
      "Kudla Blog",
      ...(article.tags || []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | Mangalore Tours`,
      description: article.subtitle || article.intro,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      images: [
        {
          url: article.heroImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle || article.intro,
      images: [article.heroImage],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [article, guidesData] = await Promise.all([
    getBlogDetailBySlug(slug),
    getGuidesData(),
  ]);

  if (!article) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mangaloretours.com";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  // Schema.org BlogPosting Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.subtitle || article.intro,
    "image": [article.heroImage],
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mangalore Tours",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/mangalore-logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <Script
        id="blog-schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailPageView
        article={article}
        allArticles={guidesData.articlesSection?.articles}
        categories={guidesData.articlesSection?.categories}
        popularPosts={guidesData.articlesSection?.popularPosts}
      />
    </>
  );
}
