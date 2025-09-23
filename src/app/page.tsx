"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WalletConnectButton from "@/components/WalletConnectButton";
import NetworkSwitcher from "@/components/NetworkSwitcher";
import { useStellarWallet } from "@/contexts/StellarWalletContext";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { getByVertical } from "@/lib/contracts/registry";

export default function Home() {
  const [buttonText, setButtonText] = useState("Get Instant Quote");
  const [isHovering, setIsHovering] = useState(false);
  const { isConnected, address, walletId } = useStellarWallet();
  const { balance, isLoading } = useWalletBalance();

  useEffect(() => {
    async function fetchEntries() {
      try {
        // setLoading(true);
        const data = await getByVertical();
        console.log("all:", data);
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

  const handleQuote = () => {
    setButtonText("Calculating...");
    setTimeout(() => {
      setButtonText("Quote Ready!");
      setTimeout(() => {
        setButtonText("Get Instant Quote");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="container mx-auto">
      <div className="airplane-bg"></div>
      <div className="background-overlay"></div>

      <header>
        <Link href="/">
          <div className="logo-section">
            <div className="logo">
              <Image
                src="/shield.png"
                width={50}
                height={50}
                alt="Plane logo"
              />
            </div>
            <span className="brand-name">Sentinel.</span>
          </div>
        </Link>

        <nav>
          <a href="#about">About</a>
          <a href="#insure">Insure</a>
          <a href="#policies">Policies</a>
          <a href="#help">Help</a>
        </nav>

        {/* <div className="flex flex-col items-center"> */}
        <WalletConnectButton className="bg-black text-white px-8 py-3 rounded-full hover:cursor-pointer hover:bg-gray-800 transition-colors" />
        {/* </div> */}
      </header>

      <main className="hero-section">
        <div className="hero-text">
          <h1>
            <span>Decentralized flight</span>
            <span>delay insurance</span>
          </h1>
          <p className="text-gray-500 mt-4 w-100 leading-relaxed">
            Smart contract-based parametric insurance with instant payouts.
            Powered by Stellar blockchain.
          </p>
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
                <label htmlFor="coverage">Coverage Amount</label>
                <input type="text" id="coverage" placeholder="$500 - $5,000" />
              </div>

              <button className="cta-button" onClick={handleQuote}>
                {buttonText}
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
      </main>
    </div>
  );
}
