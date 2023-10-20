import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans as PalusJakartaSnas } from "next/font/google";
import { cn } from "@/lib/utils";
import "../styles/globals.css";

const inter = PalusJakartaSnas({
  subsets: ["latin"],
  variable: "--font--sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen") }>
        <ThemeProvider attribute="class" >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
