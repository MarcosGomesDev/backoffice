import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import StoreProvider from "./contexts/provider";
import Loading from "./loading";

const roboto = Roboto({
  weight: [
    "100", // Thin
    "300", // Light
    "400", // Regular
    "500", // Medium
    "700", // Bold
    "900", // Black
  ],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BackOfficeX",
  description:
    "Potencializando seu E-commerce, Cuidando dos Bastidores para seu Sucesso!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-background",
          roboto.className
        )}
      >
        <ThemeProvider attribute="class" enableSystem>
          <StoreProvider>
            <Loading />
            {children}
          </StoreProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
