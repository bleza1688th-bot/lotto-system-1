import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ล็อตโต้ไทย",
    default: "ล็อตโต้ไทย - ซื้อหวยออนไลน์ถูกกฎหมาย",
  },
  description: "ซื้อหวยออนไลน์ ถูกกฎหมาย ปลอดภัย มั่นใจได้ 100%",
  keywords: ["หวย", "ล็อตโต้", "หวยออนไลน์", "ซื้อหวย", "lottery", "lotto"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans" style={{ fontFamily: "var(--font-prompt), 'Sarabun', sans-serif" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
