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
      "https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2010.03.34%20AM.png",
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
      "https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2010.03.34%20AM.png",
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
            href="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2010.03.34%20AM.png"
            as="image"
          />
          <link
            rel="preload"
            href="https://nruhnevvqgdhoxxaauxi.supabase.co/storage/v1/object/public/images/Screenshot%202024-09-25%20at%2010.03.34%20AM.png"
            as="image"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
            rel="stylesheet"
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
