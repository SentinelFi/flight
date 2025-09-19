"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [buttonText, setButtonText] = useState("Get Instant Quote");
  const [isHovering, setIsHovering] = useState(false);

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

        <button className="bg-black text-white px-8 py-3 rounded-full hover:cursor-pointer hover:bg-gray-800 transition-colors">
          Connect
        </button>
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
      </main>
    </div>
  );
}
