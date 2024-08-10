import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Chat from "./components/Chat";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clarity AI - Customer Support",
  description: "AI-powered customer support for clarity and assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} flex flex-col h-screen`}>
          <SignedIn>
            <Header />
            <div className="flex flex-grow">
              <Sidebar />
              <main className="flex-grow bg-gray-50 p-4">
                <Chat />
                {children}
              </main>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex justify-center items-center h-screen">
              <SignIn />
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
