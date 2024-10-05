import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Monty Hall App",
  description: "An App to help understand the Monty Hall Problem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="wrapper">
          {children}
        </main>
      </body>
    </html>
  );
}
