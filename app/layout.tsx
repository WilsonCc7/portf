import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Footer } from "@/components/footer";
import { SiteNav } from "@/components/site-nav";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Grade 12 PPLG student in Jakarta`,
    template: `%s · ${site.name}`,
  },
  description: copy.hero.lead,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} · Grade 12 PPLG student in Jakarta`,
    description: copy.hero.lead,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Grade 12 PPLG student in Jakarta`,
    description: copy.hero.lead,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F8F2E9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
