"use client";

import { useStellarWallet } from "@/contexts/StellarWalletContext";

interface WalletConnectButtonProps {
  className?: string;
}

export default function WalletConnectButton({
  className,
}: WalletConnectButtonProps) {
  const { isConnected, isConnecting, address, connect, disconnect, error } =
    useStellarWallet();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <div className={`wallet-connect-container ${className || ""}`}>
      <button
        onClick={handleClick}
        disabled={isConnecting}
        className="wallet-button"
      >
        {isConnecting
          ? "Connecting..."
          : isConnected && address
          ? formatAddress(address)
          : "Connect"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
