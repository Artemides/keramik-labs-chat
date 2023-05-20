"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider, useSession } from "next-auth/react";
import { Navbar } from "@/components/Navbar";
import { ApolloProvider } from "@apollo/client";
import { ApolloProviderWrapper } from "@/components/ApolloProviderWrapper";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ApolloProviderWrapper>
            <main className="h-screen">{children}</main>
          </ApolloProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
