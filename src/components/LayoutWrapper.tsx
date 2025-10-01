"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import WalletConnectButton from "@/components/WalletConnectButton";
import { Badge } from "./ui/badge";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="container mx-auto">
      <div className="main-bg"></div>
      <div className="background-overlay"></div>

      <header className="mt-8 text-white">
        <Link href="/">
          <div className="logo-section">
            <div className="logo">
              <Image src="/logo.png" width={64} height={64} alt="Plane logo" />
            </div>
            <span className="brand-name">Sentinel.</span>
            <Badge className="font-normal text-[20px] text-center w-[78px] h-[27px] px-[10px] bg-[#FFA7A7] text-[#FF0000]">
              Testnet
            </Badge>
          </div>
        </Link>

        <nav className="flex flex-row justify-between items-center rounded-[50px] py-[10px] px-[36px] gap-[36px] bg-white/10 h-[67px] font-normal text-[20px] leading-[100%] tracking-[0%]">
          <Link href="/">About</Link>
          <Link href="/insure">Insure</Link>
          <Link href="/policies">Policies</Link>
          <Link href="/help">Help</Link>
        </nav>

        <WalletConnectButton className="flex flex-row items-center justify-center w-[144px] h-[52px] rounded-[25px] py-[10px] px-[32px] bg-[#7D00FF] hover:cursor-pointer hover:bg-[#6900D6] transition-colors font-semibold text-[24px] leading-[100%] tracking-[0%]" />
      </header>
      {children}
    </div>
  );
}
