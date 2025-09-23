import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { Account, Contract, nativeToScVal, scValToNative, TransactionBuilder, xdr } from "@stellar/stellar-sdk";
import { Api, Server } from "@stellar/stellar-sdk/rpc";

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
      sorobanRpc: '',
      networkPassphrase: 'Public Global Stellar Network ; September 2015',
      explorerUrl: 'https://stellar.expert/explorer/public',
      friendbotUrl: null,
    },
    [WalletNetwork.TESTNET]: {
      horizonUrl: 'https://horizon-testnet.stellar.org',
      sorobanRpc: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      explorerUrl: 'https://stellar.expert/explorer/testnet',
      friendbotUrl: 'https://friendbot.stellar.org',
    },
  } as Record<WalletNetwork, {
    horizonUrl: string;
    sorobanRpc: string;
    networkPassphrase: string;
    explorerUrl: string;
    friendbotUrl: string | null;
  }>,
} as const;

export const CONTRACT_ADDRESSES = {
  [WalletNetwork.PUBLIC]: {
    registry: '',
    // Add more contracts as needed
  },
  [WalletNetwork.TESTNET]: {
    registry: '',
    // Add more contracts as needed
  },
} as const;
