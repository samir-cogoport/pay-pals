import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <Sonner />
      <Component {...pageProps} />
    </ThemeProvider>;
}
