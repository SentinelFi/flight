import { useStellarWallet } from "@/contexts/StellarWalletContext";
import { STELLAR_CONFIG } from "@/config";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

export function useCurrentNetwork() {
  const { currentNetwork, networkVersion } = useStellarWallet();

  console.log("Network:", currentNetwork);

  // Get the config for current network
  const networkConfig = STELLAR_CONFIG.networks[currentNetwork];

  return {
    // Current network
    network: currentNetwork,

    // Network config
    horizonUrl: networkConfig.horizonUrl,
    networkPassphrase: networkConfig.networkPassphrase,
    explorerUrl: networkConfig.explorerUrl,
    friendbotUrl: networkConfig.friendbotUrl,

    // Helper methods
    isMainnet: currentNetwork === WalletNetwork.PUBLIC,
    isTestnet: currentNetwork === WalletNetwork.TESTNET,

    // Version for triggering updates
    version: networkVersion,

    // Full config if needed
    config: networkConfig,
  };
}
