"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  ISupportedWallet,
  FREIGHTER_ID,
} from "@creit.tech/stellar-wallets-kit";
import { STELLAR_CONFIG } from "@/config";

interface WalletContextType {
  // State
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  walletId: string | null;
  error: string | null;
  currentNetwork: WalletNetwork;
  networkVersion: number;

  // Actions
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string, options?: any) => Promise<string | null>;
  signAndSubmitTransaction: (
    xdr: string,
    options?: any
  ) => Promise<string | null>;
  getPublicKey: () => Promise<string | null>;
  switchNetwork: (network: WalletNetwork) => void;

  // Kit instance (for advanced usage)
  kit: StellarWalletsKit | null;
}

const StellarWalletContext = createContext<WalletContextType | undefined>(
  undefined
);

interface StellarWalletProviderProps {
  children: ReactNode;
  network?: WalletNetwork;
  autoConnect?: boolean;
}

export function StellarWalletProvider({
  children,
  network = STELLAR_CONFIG.defaultNetwork,
  autoConnect = true,
}: StellarWalletProviderProps) {
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize network from localStorage or use default
  const [currentNetwork, setCurrentNetwork] = useState<WalletNetwork>(() => {
    if (typeof window !== "undefined") {
      const savedNetwork = localStorage.getItem(
        "stellar_network"
      ) as WalletNetwork;
      return savedNetwork || network;
    }
    return network;
  });

  // Network version for triggering updates in dependent components
  const [networkVersion, setNetworkVersion] = useState(0);

  // Initialize the kit
  useEffect(() => {
    const stellarKit = new StellarWalletsKit({
      network: currentNetwork,
      selectedWalletId:
        localStorage.getItem("stellar_wallet_id") || FREIGHTER_ID,
      modules: allowAllModules(),
    });

    setKit(stellarKit);

    // Auto-connect if wallet was previously connected
    if (autoConnect) {
      const savedAddress = localStorage.getItem("stellar_wallet_address");
      const savedWalletId = localStorage.getItem("stellar_wallet_id");

      if (savedAddress && savedWalletId) {
        stellarKit.setWallet(savedWalletId);
        setAddress(savedAddress);
        setWalletId(savedWalletId);
        setIsConnected(true);
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, [currentNetwork, autoConnect]);

  // Connect wallet
  const connect = useCallback(async () => {
    if (!kit) {
      setError("Wallet kit not initialized");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          try {
            kit.setWallet(option.id);
            const { address: walletAddress } = await kit.getAddress();

            // Save to state
            setAddress(walletAddress);
            setWalletId(option.id);
            setIsConnected(true);

            // Persist to localStorage
            localStorage.setItem("stellar_wallet_address", walletAddress);
            localStorage.setItem("stellar_wallet_id", option.id);
          } catch (err) {
            console.error("Error getting address:", err);
            setError(
              err instanceof Error
                ? err.message
                : "Failed to get wallet address"
            );
            setIsConnected(false);
          }
        },
      });
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, [kit]);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setAddress(null);
    setWalletId(null);
    setIsConnected(false);
    setError(null);

    // Clear from localStorage
    localStorage.removeItem("stellar_wallet_address");
    localStorage.removeItem("stellar_wallet_id");
  }, []);

  // Sign transaction
  const signTransaction = useCallback(
    async (xdr: string, options?: any) => {
      if (!kit || !isConnected || !address) {
        setError("Wallet not connected");
        return null;
      }

      setError(null);

      try {
        const { signedTxXdr } = await kit.signTransaction(xdr, {
          address,
          networkPassphrase:
            STELLAR_CONFIG.networks[currentNetwork].networkPassphrase,
          ...options,
        });

        return signedTxXdr;
      } catch (err) {
        console.error("Error signing transaction:", err);
        setError(
          err instanceof Error ? err.message : "Failed to sign transaction"
        );
        return null;
      }
    },
    [kit, isConnected, address, currentNetwork]
  );

  // Sign and submit transaction
  const signAndSubmitTransaction = useCallback(
    async (xdr: string, options?: any) => {
      if (!kit || !isConnected || !address) {
        setError("Wallet not connected");
        return null;
      }

      setError(null);

      try {
        // First sign the transaction
        const signedXdr = await signTransaction(xdr, options);
        if (!signedXdr) return null;

        console.log("Signed XDR ready for submission:", signedXdr);

        // const server = new StellarSdk.Server(STELLAR_CONFIG.networks[currentNetwork].horizonUrl);
        // const transaction = new StellarSdk.Transaction(signedXdr, STELLAR_CONFIG.networks[currentNetwork].networkPassphrase);
        // const result = await server.submitTransaction(transaction);
        // return result.hash;

        return signedXdr; // Return signed XDR for now
      } catch (err) {
        console.error("Error signing and submitting transaction:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to sign and submit transaction"
        );
        return null;
      }
    },
    [kit, isConnected, address, signTransaction, currentNetwork]
  );

  // Get public key
  const getPublicKey = useCallback(async () => {
    if (!kit || !isConnected) {
      setError("Wallet not connected");
      return null;
    }

    setError(null);

    try {
      const { address: publicKey } = await kit.getAddress();
      return publicKey;
    } catch (err) {
      console.error("Error getting public key:", err);
      setError(err instanceof Error ? err.message : "Failed to get public key");
      return null;
    }
  }, [kit, isConnected]);

  // Switch network
  const switchNetwork = useCallback((network: WalletNetwork) => {
    setCurrentNetwork(network);
    // Persist to localStorage
    localStorage.setItem("stellar_network", network);
    // Increment version to trigger updates in dependent hooks
    setNetworkVersion((prev) => prev + 1);
  }, []);

  const value: WalletContextType = {
    // State
    isConnected,
    isConnecting,
    address,
    walletId,
    error,
    currentNetwork,
    networkVersion,

    // Actions
    connect,
    disconnect,
    signTransaction,
    signAndSubmitTransaction,
    getPublicKey,
    switchNetwork,

    // Kit instance
    kit,
  };

  return (
    <StellarWalletContext.Provider value={value}>
      {children}
    </StellarWalletContext.Provider>
  );
}

// Custom hook to use the wallet context
export function useStellarWallet() {
  const context = useContext(StellarWalletContext);

  if (context === undefined) {
    throw new Error(
      "useStellarWallet must be used within a StellarWalletProvider"
    );
  }

  return context;
}

// Export types for external use
export type { WalletContextType };
export { WalletNetwork };
