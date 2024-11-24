import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "../providers/ConvexClientProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat app",
  description: "Real-time chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased font-medium`}>
        <ConvexClientProvider>
          <TooltipProvider delayDuration={50}>{children}</TooltipProvider>
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
