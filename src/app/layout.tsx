import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Font Configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Viewport settings
export const viewport: Viewport = {
  themeColor: "#000000",
};

// 3. Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://mayank-portfolio-eta.vercel.app"), 
  
  title: {
    default: "Mayank Sherawat | Full Stack Developer",
    template: "%s | Mayank Sherawat", 
  },
  description: "Portfolio of a Full Stack Developer specializing in React, Next.js, and Node.js. View my projects and experience.",
  
  keywords: ["Full Stack Developer", "React", "Next.js", "Portfolio", "Web Development", "Software Engineer"],
  
  authors: [{ name: "Mayank Sherawat", url: "https://mayank-portfolio-eta.vercel.app/" }],
  
  openGraph: {
    title: "Mayank Sherawat | Full Stack Developer",
    description: "Building scalable web applications with modern technologies.",
    url: "https://mayank-portfolio-eta.vercel.app/",
    siteName: "Mayank Sherawat Portfolio",
    locale: "en_US",
    type: "website",
    // Note: If you create an 'opengraph-image.tsx' file later, 
    // you should remove this images array too. 
    // For now, it points to a static file.
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Mayank Sherawat Portfolio",
      },
    ],
  },
  
  // REMOVED: icons: { ... } 
  // Next.js will now automatically find and use your app/icon.tsx
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        {/* <Navbar /> */}

        <main className="grow">
          {children}
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}