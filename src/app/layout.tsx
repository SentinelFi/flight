import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  StellarWalletProvider,
  WalletNetwork,
} from "@/contexts/StellarWalletContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter();

export const metadata: Metadata = {
  title: "Sentinel - Decentralized Flight Delay Insurance",
  description:
    "Protect your journey with automated, blockchain-powered flight insurance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StellarWalletProvider
          network={WalletNetwork.PUBLIC}
          autoConnect={true}
        >
          <LayoutWrapper>{children}</LayoutWrapper>
        </StellarWalletProvider>
      </body>
    </html>
  );
}
