import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function FooterMain() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white footer mx-auto relative">
      <div className="flex flex-col items-center px-6 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="">
            <div className="flex items-center gap-3">
              <div className="logo">
                <Image
                  src="/logo.png"
                  width={64}
                  height={64}
                  alt="Plane logo"
                />
              </div>
              <span className="brand-name">Sentinel.</span>
            </div>
            <p className="mt-3 text-[24px]">
              Smart contract-based parametric insurance
            </p>

            <div className="mt-5 flex items-center gap-4">
              <Link
                aria-label="X (Twitter)"
                href="https://x.com/sentinel_fi/"
                target="_blank"
                className="transition-opacity hover:opacity-80"
              >
                <Icon icon="tabler:brand-x" width="32" height="32" />
              </Link>
              <Link
                aria-label="Discord"
                href="https://discord.gg/CBhYMk786z"
                target="_blank"
                className="transition-opacity hover:opacity-80"
              >
                <Icon icon="tabler:brand-discord" width="32" height="32" />
              </Link>
              <Link
                aria-label="GitHub"
                href="https://github.com/SentinelFi"
                target="_blank"
                className="transition-opacity hover:opacity-80"
              >
                <Icon icon="tabler:brand-github" width="32" height="32" />
              </Link>
            </div>
          </div>

          <div className="w-[30px]" />

          <div className="">
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
              <div className="min-w-[160px] text-[20px]">
                <p className="font-semibold">Quick Links</p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <Link href="#" className="hover:text-white/50">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/SentinelFi/"
                      target="_blank"
                      className="hover:text-white/50"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://stellar.org/"
                      target="_blank"
                      className="hover:text-white/50"
                    >
                      Stellar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/SentinelFi/"
                      target="_blank"
                      className="hover:text-white/50"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="min-w-[160px] text-[20px]">
                <p className="font-semibold">Legal</p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <Link href="/terms" className="hover:text-white/50">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/policy" className="hover:text-white/50">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>Use at your own risk.</li>
                </ul>
              </div>

              <div className="min-w-[160px] text-[20px]">
                <p className="font-semibold">Connect</p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <Link
                      href="https://x.com/sentinel_fi/"
                      target="_blank"
                      className="hover:text-white/50"
                    >
                      X (Twitter)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://discord.gg/CBhYMk786z"
                      target="_blank"
                      className="hover:text-white/50"
                    >
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/SentinelFi"
                      target="_blank"
                      className="hover:text-white/50"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-3xl"
        style={{ borderTop: "0.5px solid rgba(255, 255, 255, 0.5)" }}
      />

      <div className="mx-auto px-6 py-6 text-center text-[16px]">
        <p>© {year} Sentinel. Hedge Risks on Soroban.</p>
        <p className="mt-1">
          Decentralized Flight Delay Insurance — Powered by Stellar Blockchain.
        </p>
        <p className="text-gray-300 text-[14px] mt-1">
          This is independent software, not affiliated with, sponsored or
          endorsed by the Stellar Development Foundation.
        </p>
      </div>
    </footer>
  );
}
