import type { Metadata } from "next";
import { Inter, Caveat, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const caveat = Caveat({ subsets: ["latin"], variable: '--font-caveat' });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: '--font-serif' });
export const metadata: Metadata = {
  title: "detourvia",
  description: "A handwritten visual journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveat.variable} ${dmSerif.variable} bg-[#FDFBF7]`}>
        {children}
      </body>
    </html>
  );
}