import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FlashcardsSection from "./components/FlashcardsSection"; 

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brain Deck",
  description: "An AI-powered flashcard tool to boost your learning with smart, adaptive content and seamless Stripe payments.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} flex flex-col h-screen`}>
            <Header />
            <div className="flex flex-grow">
<<<<<<< HEAD
              <Sidebar />
              <main className="flex-grow bg-gray-50 p-4 overflow-y-auto">
                <FlashcardsSection />
=======
>>>>>>> 6eaf94b2fa5b331373e6f4bd7b2c222c8f0fd304
                {children}
            </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
