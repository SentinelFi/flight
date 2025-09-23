"use client";

import { STELLAR_CONFIG } from "@/config";
import { useStellarWallet } from "@/contexts/StellarWalletContext";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

export default function NetworkSwitcher() {
  const { switchNetwork } = useStellarWallet();

  return (
    <div className="network-switcher">
      {/* <label>Network:</label> */}
      <select
        onChange={(e) => switchNetwork(e.target.value as WalletNetwork)}
        defaultValue={STELLAR_CONFIG.defaultNetwork}
        className="px-2"
      >
        <option value={WalletNetwork.PUBLIC}>Mainnet</option>
        <option value={WalletNetwork.TESTNET}>Testnet</option>
      </select>
    </div>
  );
}
