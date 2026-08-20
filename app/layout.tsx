import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const description =
  "The Old Monk playlist - an 80s & 90s Bollywood playlist for daaru nights with friends. Old is gold Hindi songs, the happy ones and the heartbreak ones, back to back.";

export const metadata: Metadata = {
  metadataBase: new URL("https://oldmonk.vercel.app"),
  title: {
    default: "Old Monk - 80s & 90s Bollywood Playlist",
    template: "%s | Old Monk",
  },
  description,
  keywords: [
    "old monk playlist",
    "daaru playlist",
    "daru playlist",
    "80s bollywood songs",
    "90s bollywood songs",
    "hindi gaane playlist",
    "friends get together playlist",
    "old is gold songs",
    "bollywood retro playlist",
    "purane gaane playlist",
    "old hindi songs playlist",
    "evergreen bollywood songs",
    "throwback bollywood playlist",
    "nostalgic hindi songs",
    "kishore kumar songs playlist",
    "lata mangeshkar songs playlist",
    "asha bhosle songs playlist",
    "drinking songs playlist",
    "rainy day songs playlist",
    "hostel days playlist",
    "sad old hindi songs",
  ],
  openGraph: {
    title: "Old Monk - 80s & 90s Bollywood Playlist",
    description,
    url: "/",
    siteName: "Old Monk",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Old Monk - 80s & 90s Bollywood Playlist",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "U6sIYlT0P0m1Bi63ruipBcqfEismglBZr4yfPm8HJN8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Old Monk",
  url: "https://oldmonk.vercel.app",
  description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased overscroll-none`}
    >
      <Analytics/>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
