import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { BlogIndex } from "@/components/sections/blog/BlogIndex";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { BLOG_META, BLOG_PAGE, PUBLISHED_POSTS, SITE } from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

const hasPosts = PUBLISHED_POSTS.length > 0;

/** noindex until the first post is published, so an empty blog is never indexed. */
export const metadata: Metadata = {
  title: { absolute: BLOG_META.title },
  description: BLOG_META.description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: BLOG_META.title,
    description: BLOG_META.description,
    url: "/blog",
  },
  robots: { index: hasPosts, follow: true },
};

const jsonLd = [
  ...(hasPosts
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: BLOG_PAGE.heading,
          url: `${SITE.url}/blog`,
          publisher: { "@id": `${SITE.url}/#business` },
          blogPost: PUBLISHED_POSTS.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: `${SITE.url}/blog/${post.slug}`,
            datePublished: post.publishedOn,
            author: { "@type": "Organization", name: SITE.name },
          })),
        },
      ]
    : []),
  breadcrumbJsonLd("Blog", "/blog"),
];

export default function BlogPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <BlogIndex />
      <FinalCta headline={BLOG_PAGE.ctaHeadline} text={BLOG_PAGE.ctaText} />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
