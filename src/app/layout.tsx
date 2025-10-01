import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Header from "@/components/site/Header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Hacktoberfest Community Blog",
  description: "A modern community blog platform for Hacktoberfest 2025 built with Next.js and TailwindCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}
