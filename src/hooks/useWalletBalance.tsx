import { useState, useEffect } from "react";
import { useStellarWallet } from "@/contexts/StellarWalletContext";
import { useHorizonClient } from "./useHorizonClient";

export function useWalletBalance() {
  const { address, isConnected, networkVersion } = useStellarWallet();
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const horizonClient = useHorizonClient({
    maxRequests: 5, // Custom rate limit for balance checks
    windowMs: 1000,
  });

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address || !isConnected) {
        setBalance(undefined);
        return;
      }

      setIsLoading(true);
      try {
        const account = await horizonClient.loadAccount(address);
        // console.log(account, account.balances);
        const nativeBalance = account.balances.find(
          (b: any) => b.asset_type === "native"
        );
        setBalance(nativeBalance?.balance || "0");
      } catch (err) {
        console.log("Error fetching XLM balance:", err);
        setBalance(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [address, isConnected, networkVersion]);

  return { balance, isLoading };
}
