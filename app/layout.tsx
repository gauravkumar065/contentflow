import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://contentflow-iota.vercel.app/"),
  title: {
    default: "Content Flow",
    template: `%s | Content Flow`,
  },
  description:
    "Streamline your content creation workflow from ideation to production with AI-powered idea management and script writing",
  openGraph: {
    description:
      "Revolutionize your content creation process with Content Flow - AI-powered idea management and script writing for efficient workflows",
    images: [
      "https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png",
    ],
    url: "https://contentflow-iota.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Flow - Streamline Your Content Creation",
    description:
      "Elevate your content creation with AI-powered idea management and script writing. From ideation to production, all in one place.",
    siteId: "",
    creator: "@contentflow",
    creatorId: "",
    images: [
      "https://utfs.io/f/8a428f85-ae83-4ca7-9237-6f8b65411293-eun6ii.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="preload"
            href="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
            as="image"
          />
          <link
            rel="preload"
            href="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
            as="image"
          />
        </head>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}
