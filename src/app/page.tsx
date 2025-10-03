"use client";

import { useEffect, useRef, useState } from "react";
import {
  useStellarWallet,
  WalletNetwork,
} from "@/contexts/StellarWalletContext";
import { useWalletBalance } from "@/hooks/useWalletBalance";
// import { getByVertical } from "@/lib/contracts/registry";
// import { getPoliciesOwnedBy } from "@/lib/contracts/controller";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import lottie, { AnimationItem } from "lottie-web";
import { Icon } from "@iconify/react";

export default function Home() {
  const { isConnected, address, switchNetwork, currentNetwork } =
    useStellarWallet();
  const { balance, isLoading } = useWalletBalance();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("Testnet");
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);

  const handleSelect = (value: string) => {
    console.log("Selected Network", value);
    setSelectedNetwork(value);
    setIsNetworkDropdownOpen(false);
    if (value === "Testnet") {
      switchNetwork(WalletNetwork.TESTNET);
      console.log("Testnet");
    } else if (value === "Public") {
      switchNetwork(WalletNetwork.PUBLIC);
      console.log("Public");
    }
  };

  const handleSubscribe = async () => {
    setEmailError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setShowThanks(true);
        setEmail("");
      } else {
        alert(
          "Something went wrong (backend issue), please try again or contact a support team"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Unexpected error (backend issue), please try again or contact a support team"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    switchNetwork(WalletNetwork.TESTNET);
  }, []);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/globeanim.json",
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    async function fetchEntries() {
      try {
        // setLoading(true);
        // const data = await getByVertical();
        // console.log("all:", data);
        // setError(null);
      } catch (err) {
        // setError(err instanceof Error ? err.message : 'Failed to fetch entries');
        console.error("Error fetching registry entries:", err);
      } finally {
        // setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  useEffect(() => {
    async function fetchPolicies() {
      try {
        // setLoading(true);
        if (!address) return;
        // const data = await getPoliciesOwnedBy(address);
        // console.log("policies:", data);
        // setError(null);
      } catch (err) {
        // setError(err instanceof Error ? err.message : 'Failed to fetch entries');
        console.error("Error fetching policies:", err);
      } finally {
        // setLoading(false);
      }
    }
    fetchPolicies();
  }, [address]);

  const getCovered = () => {
    router.push("/insure");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <main>
      <div className="container text-white relative flex justify-center items-start h-[1800px]">
        <div ref={containerRef} className="w-full mt-44 self-"></div>

        <div className="hero-text absolute top-12 flex flex-col items-center">
          <h1 className="font-normal text-[48px] max-w-[400px] leading-[40px] sm:text-[72px] sm:max-w-[600px] sm:leading-[60px] md:text-[90px] md:max-w-[750px] md:leading-[94px] lg:text-[96px] xl:text-[96px] tracking-[0] text-center">
            Decentralized flight delay insurance
          </h1>
          <p className="font-normal text-center text-[16px] max-w-[400px] sm:text-[24px] sm:max-w-[600px] xl:text-2xl xl:max-w-[750px] mt-8">
            Smart contract-based parametric insurance with instant payouts.
            Powered by Stellar blockchain.
          </p>

          <div className="flex flex-col">
            <div className="relative mt-8 md:md-24 xl:mt-40 self-end">
              <div className="flex">
                {isConnected && (
                  <p className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[4px] font-semibold text-[16px] mx-auto my-auto text-center mr-2">
                    {isLoading
                      ? "Loading..."
                      : balance
                      ? `${parseFloat(balance).toFixed(1)} XLM`
                      : "0.0 XLM"}
                  </p>
                )}
                <div className="w-[113px] h-[34px]">
                  <button
                    onClick={() =>
                      setIsNetworkDropdownOpen(!isNetworkDropdownOpen)
                    }
                    disabled={isLoading}
                    className="w-full h-full rounded-[100px] px-[10px] py-[5px] flex justify-between items-center
                   bg-[rgba(125,0,255,1)] border border-[rgba(255,255,255,0.2)] text-white font-semibold cursor-pointer"
                  >
                    {selectedNetwork}
                    <Icon
                      icon={
                        isNetworkDropdownOpen
                          ? "mdi:chevron-up"
                          : "mdi:chevron-down"
                      }
                      width="24"
                      height="24"
                    />
                  </button>
                  {isNetworkDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-[rgba(125,0,255,1)] border border-[rgba(255,255,255,0.2)] rounded-[4px] text-white text-sm z-10">
                      <div
                        className="px-3 py-1 cursor-pointer hover:bg-purple-700 font-semibold"
                        onClick={() => handleSelect("Testnet")}
                      >
                        Testnet
                      </div>
                      <div
                        className="px-3 py-1 cursor-pointer hover:bg-purple-700 font-semibold"
                        onClick={() => handleSelect("Public")}
                      >
                        Public
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative glass-box mt-4">
              <div className="bg-[#0F0A28]/5 backdrop-blur-md rounded-[7px] text-left p-6 md:p-8">
                <p className="font-semibold text-[24px]">Get Coverage Today</p>
                <p className="font-normal text-[16px] max-w-[350px] md:text-[24px] md:max-w-[600px] lg:max-w-[750px]">
                  Protect your journey with automated, blockchain-powered flight
                  insurance.
                </p>

                <div className="flex flex-col md:flex-row justify-between gap-6 mt-6 w-full items-center">
                  <div className="flex flex-col items-start">
                    <div className="font-bold text-[20px] leading-tight tracking-tight">
                      Flight Number
                    </div>
                    <div className="relative mt-6">
                      <input
                        type="text"
                        placeholder="A1234"
                        className="w-[172px] h-[40px] rounded-[4px] border border-[rgba(255,255,255,0.2)] px-[10px] bg-gradient-to-r from-[#020405] to-[#191022] text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      <Icon
                        icon="mdi:airplane"
                        width="24"
                        height="24"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="font-bold text-[20px] leading-tight tracking-tight">
                      Travel Date
                    </div>
                    <div className="relative mt-6">
                      <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="w-[172px] h-[40px] rounded-[4px] border border-[rgba(255,255,255,0.2)] px-[10px] bg-gradient-to-r from-[#020405] to-[#191022] text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      <Icon
                        icon="mdi:calendar"
                        width="24"
                        height="24"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="font-bold text-[20px] leading-tight tracking-tight">
                      Premium Amount
                    </div>
                    <div className="relative mt-6">
                      <input
                        type="text"
                        placeholder="E.g., 500"
                        className="w-[172px] h-[40px] rounded-[4px] border border-[rgba(255,255,255,0.2)] px-[10px] bg-gradient-to-r from-[#020405] to-[#191022] text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      <Icon
                        icon="mdi:currency-usd"
                        width="24"
                        height="24"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-12">
                  <button
                    className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] w-[200px] font-bold text-[24px] my-auto hover:cursor-pointer"
                    onClick={getCovered}
                  >
                    Get Covered
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-[18px] sm:gap-[32px] md:gap-[64px] mt-12">
            <div className="stat w-[130px] h-[110px] rounded-[8px] p-[10px] bg-[rgba(223,184,255,0.2)] flex flex-col items-center justify-center">
              <div className="font-bold text-[48px] leading-none">24/7</div>
              <div className="font-medium text-[20px] leading-none mt-2">
                Coverage
              </div>
            </div>
            <div className="stat w-[130px] h-[110px] rounded-[8px] p-[10px] bg-[rgba(223,184,255,0.2)] flex flex-col items-center justify-center">
              <div className="font-bold text-[48px] leading-none">100%</div>
              <div className="font-medium text-[20px] leading-none mt-2">
                Automated
              </div>
            </div>
            <div className="stat w-[130px] h-[110px] rounded-[8px] p-[10px] bg-[rgba(223,184,255,0.2)] flex flex-col items-center justify-center">
              <div className="font-bold text-[48px] leading-none">0%</div>
              <div className="font-medium text-[20px] leading-none mt-2">
                Hassle
              </div>
            </div>
          </div>

          <div className="mt-40 flex flex-col items-center space-y-4">
            <p className="font-semibold text-[42px] leading-[42px] sm:text-[88px] sm:leading-[88px] lg:text-[96px] lg:leading-[96px] text-center">
              Join Our Newsletter
            </p>
            <p className="text-center text-[20px] max-w-[400px] md:text-[24px] md:max-w-[750px]">
              Get the latest updates, insights, and news straight to your inbox
              and stay ahead of what is next.
            </p>
            <div className="w-full flex justify-center mt-10">
              <div className="relative w-full max-w-[409px] bg-[rgba(13,11,24,1)] rounded-[100px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Email"
                  className="w-full h-[52px] rounded-[100px] border border-[rgba(255,255,255,0.5)]  
                     pl-[10px] pr-[140px] py-[10px] bg-transparent text-white 
                     focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={isSubmitting}
                  className="absolute right-[5px] top-1/2 -translate-y-1/2 w-[124px] h-[42px] 
                     rounded-[50px] bg-[rgba(0,255,38,1)] text-black font-bold text-[24px] 
                     text-center flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? "Subscribing" : "Subscribe"}
                </button>
              </div>
            </div>
            {emailError && (
              <p className="text-[16px] text-destructive">{emailError}</p>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showThanks} onOpenChange={setShowThanks}>
        <DialogContent className="sm:max-w-md bg-[#7d00ff] text-white border-none">
          <DialogHeader>
            <DialogTitle className="text-center">Thank You!</DialogTitle>
            <DialogDescription className="text-center text-white text-[16px]">
              {"You've been successfully added to our newsletter."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setShowThanks(false)}
              className="bg-white hover:bg-accent/90 text-black cursor-pointer"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
