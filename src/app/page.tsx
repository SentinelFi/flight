"use client";

import { useEffect, useRef, useState } from "react";
import NetworkSwitcher from "@/components/NetworkSwitcher";
import { useStellarWallet } from "@/contexts/StellarWalletContext";
import { useWalletBalance } from "@/hooks/useWalletBalance";
// import { getByVertical } from "@/lib/contracts/registry";
// import { getPoliciesOwnedBy } from "@/lib/contracts/controller";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import lottie from "lottie-web";
import { Icon } from "@iconify/react";

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const { isConnected, address, walletId } = useStellarWallet();
  const { balance, isLoading } = useWalletBalance();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("Testnet");
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedNetwork(value);
    setIsNetworkDropdownOpen(false);
  };

  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/globeanim.json",
      });
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <main>
      <div className="container text-white relative flex justify-center">
        <div ref={containerRef} className="w-full h-full mt-44"></div>

        <div className="hero-text absolute top-12 flex flex-col items-center">
          <h1 className="font-normal text-[96px] leading-[94px] tracking-[0] text-center max-w-[750px]">
            Decentralized flight delay insurance
          </h1>
          <p className="font-normal text-2xl text-center max-w-[750px]">
            Smart contract-based parametric insurance with instant payouts.
            Powered by Stellar blockchain.
          </p>

          <div className="relative mt-40 self-end">
            <div className="w-[113px] h-[34px]">
              <button
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="w-full h-full rounded-[4px] px-[10px] py-[5px] flex justify-between items-center
                   bg-[rgba(125,0,255,1)] border border-[rgba(255,255,255,0.2)] text-white cursor-pointer"
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
                    className="px-3 py-1 cursor-pointer hover:bg-purple-700"
                    onClick={() => handleSelect("Testnet")}
                  >
                    Testnet
                  </div>
                  <div
                    className="px-3 py-1 cursor-pointer hover:bg-purple-700"
                    onClick={() => handleSelect("Public")}
                  >
                    Public
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative glass-box mt-4">
            <div className="bg-[#0F0A28]/5 backdrop-blur-md rounded-[7px] text-left p-8">
              <p className="font-semibold text-[24px]">Get Coverage Today</p>
              <p className="font-normal text-[24px]">
                Protect your journey with automated, blockchain-powered flight
                insurance.
              </p>

              <div className="flex justify-between gap-6 mt-6 w-full">
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
                <button className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] w-[200px] font-bold text-[24px] my-auto hover:cursor-pointer">
                  Get Covered
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-[64px] mt-12">
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
        </div>
      </div>

      {/* <div className="hero-section">
        <div className="hero-text">
          <h1>
            <span>Decentralized flight</span>
            <span>delay insurance</span>
          </h1>
          <p className="text-gray-500 mt-4 w-100 leading-relaxed">
            Smart contract-based parametric insurance with instant payouts.
            Powered by Stellar blockchain.
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base shadow-lg border-none rounded-xl w-[300]"
                disabled={isSubmitting}
              />
              {emailError && (
                <p className="text-sm text-destructive">{emailError}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-10 shadow-lg border-none rounded-xl text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200"
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </div>

        <div>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 font-medium px-4 py-2 rounded-full shadow-lg shadow-yellow-500/25">
            <span className="text-sm uppercase tracking-wide">
              <NetworkSwitcher />
            </span>
            {isConnected && (
              <p>
                {isLoading
                  ? "Loading..."
                  : balance
                  ? `${parseFloat(balance).toFixed(1)} XLM`
                  : "0.0 XLM"}
              </p>
            )}
          </div>
          <div className="card-container">
            <div
              className="white-card"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                transform: isHovering ? "translateY(-5px)" : "translateY(0)",
              }}
            >
              <div className="card-header">
                <h2>Get Coverage Today</h2>
                <p>
                  Protect your journey with automated, blockchain-powered flight
                  insurance
                </p>
              </div>

              <div className="input-group">
                <label htmlFor="flight">Flight Number</label>
                <input type="text" id="flight" placeholder="e.g., AA1234" />
              </div>

              <div className="input-group">
                <label htmlFor="date">Travel Date</label>
                <input type="date" id="date" />
              </div>

              <div className="input-group">
                <label htmlFor="coverage">Premium Amount</label>
                <input type="text" id="coverage" placeholder="e.g. $500" />
              </div>

              <button className="cta-button" onClick={getCovered}>
                Get Covered
              </button>

              <div className="stats">
                <div className="stat-item">
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Coverage</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Automated</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">0%</div>
                  <div className="stat-label">Hassle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <Dialog open={showThanks} onOpenChange={setShowThanks}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Thank You!</DialogTitle>
            <DialogDescription className="text-center">
              {
                "You've been successfully added to our waitlist. We'll notify you as soon as we launch!"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setShowThanks(false)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </main>
  );
}
