import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

const getDefaultNetwork = (): WalletNetwork => {
  const network = process.env.NEXT_PUBLIC_DEFAULT_STELLAR_NETWORK?.toLowerCase();
  switch(network) {
    case 'mainnet':
    case 'public':
      return WalletNetwork.PUBLIC;
    case 'testnet':
      return WalletNetwork.TESTNET;
    default:
      return WalletNetwork.TESTNET; // default fallback
  }
};

// In your config/index.ts
export const STELLAR_CONFIG = {
  defaultNetwork: getDefaultNetwork(),
  networks: {
    [WalletNetwork.PUBLIC]: {
      horizonUrl: 'https://horizon.stellar.org',
      networkPassphrase: 'Public Global Stellar Network ; September 2015',
      explorerUrl: 'https://stellar.expert/explorer/public',
      friendbotUrl: null,
    },
    [WalletNetwork.TESTNET]: {
      horizonUrl: 'https://horizon-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      explorerUrl: 'https://stellar.expert/explorer/testnet',
      friendbotUrl: 'https://friendbot.stellar.org',
    },
  } as Record<WalletNetwork, {
    horizonUrl: string;
    networkPassphrase: string;
    explorerUrl: string;
    friendbotUrl: string | null;
  }>,
} as const;