"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import WalletConnectButton from "@/components/WalletConnectButton";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="container mx-auto">
      <div className="airplane-bg"></div>
      <div className="background-overlay"></div>

      <header>
        <Link href="/">
          <div className="logo-section">
            <div className="logo">
              <Image
                src="/shield.png"
                width={50}
                height={50}
                alt="Plane logo"
              />
            </div>
            <span className="brand-name">Sentinel.</span>
          </div>
        </Link>

        <nav>
          <a href="/">About</a>
          <a href="#insure">Insure</a>
          <Link href="/policies">Policies</Link>
          <a href="#help">Help</a>
        </nav>

        <WalletConnectButton className="bg-black text-white px-8 py-3 rounded-full hover:cursor-pointer hover:bg-gray-800 transition-colors" />
      </header>
      {children}
    </div>
  );
}
