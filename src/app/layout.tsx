import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Industrial Cleaning Services | House Cleaning in OKC Metro",
  description:
    "Professional house cleaning services in the Oklahoma City metro area. Book online in 60 seconds. Trusted by thousands of happy customers.",
  keywords: [
    "house cleaning OKC",
    "cleaning service Oklahoma City",
    "maid service OKC",
    "home cleaning OKC metro",
    "professional cleaning Oklahoma",
  ],
  openGraph: {
    title: "Industrial Cleaning Services | OKC Metro",
    description: "Professional house cleaning services in the OKC metro area.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/ics-icon-1.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/ics-icon-1.png" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
