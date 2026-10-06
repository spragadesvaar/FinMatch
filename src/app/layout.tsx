import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FINMATCH AI - Loan Discovery & Financial Decision Support",
  description: "Intelligent Financial Decision Support System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..900;1,9..40,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
