"use client";

import FlightInsurancePurchase from "@/components/FlightInsurancePurchase";
// import WalletNotConnected from "@/components/WalletNotConnected";
// import { useStellarWallet } from "@/contexts/StellarWalletContext";

export default function InsurePage() {
  // const { isConnected, address } = useStellarWallet();
  // if (!isConnected || !address) return <WalletNotConnected />;
  return <FlightInsurancePurchase />;
}
