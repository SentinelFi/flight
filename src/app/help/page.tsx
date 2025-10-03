"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TestnetAlert from "@/components/TestnetAlert";
import { Icon } from "@iconify/react";

const faqData = [
  {
    question: "How does parametric flight delay insurance work?",
    answer:
      "Our parametric insurance automatically triggers payouts based on objective flight delay data from oracles. When your flight is delayed beyond the threshold specified in your policy, you receive compensation without filing claims or providing documentation.",
  },
  {
    question: "What triggers an automatic payout?",
    answer:
      "Payouts are triggered by verified flight delay data from aviation APIs. The smart contract automatically executes when delay conditions are met: payouts based on index value. No human intervention required.",
  },
  {
    question: "How quickly do I receive compensation?",
    answer:
      "Compensation is typically processed within 1-2 hours after the delay threshold is met. Funds are automatically transferred between pools once the oracle confirms the delay duration.",
  },
  {
    question: "What flights and airlines are covered?",
    answer:
      "Currently supporting selected international airlines and routes. Coverage includes commercial flights. Private jets, charter flights, and some regional carriers are not be supported in the testnet version.",
  },
  {
    question: "How are premiums calculated?",
    answer:
      "Premiums are calculated dynamically based on configured trigger and other parameters.",
  },
  {
    question: "What happens if the oracle fails?",
    answer:
      "We use multiple oracle sources for redundancy. If primary oracles fail, backup systems activate. In rare cases of complete oracle failure, manual verification processes ensure legitimate claims are honored.",
  },
  {
    question: "Can I cancel my policy?",
    answer: "No.",
  },
  {
    question: "What's the maximum coverage amount?",
    answer: "Limits can be configured by each insurance creator individually.",
  },
];

const CONTROLLER_CONTRACT = "";
const ORACLE_CONTRACT = "";
const POOL_CONTRACT = "";

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<string>("");

  const handleIssuesClick = () => {
    window.open(
      "https://github.com/SentinelFi",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDocsClick = () => {
    window.open(
      "https://github.com/SentinelFi",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleContractClick = (contract: string) => {
    window.open(
      `https://stellar.expert/explorer/testnet/contract/${contract}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white mb-32">
      {/* Hero Section */}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[40px] font-bold mb-2 text-center max-w-[750px] mx-auto">
            Help Center
          </h1>
          <p className="mt-4 text-[20px] text-center max-w-[750px] mx-auto">
            Get assistance with your flight delay insurance. Access answers,
            report issues, and request new features through our comprehensive
            support center.
          </p>
        </div>

        <TestnetAlert />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="relative glass-box mt-4">
          <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
            <div className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[color:var(--insurance-blue-light)]">
                  <Icon icon="mdi:github" width="24" height="24" />
                </div>
                <div>
                  <div className="text-lg">Report Issues</div>
                  <div>Reports & Requests</div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[16px] text-gray-300 mb-4">
                Found a bug or have an idea? Help us improve by reporting issues
                on GitHub.
              </p>
              <Button
                onClick={handleIssuesClick}
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-accent bg-transparent hover:cursor-pointer"
              >
                <Icon icon="mdi:external-link" width="24" height="24" />
                Open GitHub Issues
              </Button>
            </div>
          </div>
        </div>
        <div className="relative glass-box mt-4">
          <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
            <div className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[color:var(--insurance-blue-light)]">
                  <Icon icon="mdi:file-text" width="24" height="24" />
                </div>
                <div>
                  <div className="text-lg">Documentation</div>
                  <div>Docs & Guides</div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[16px] text-gray-300 mb-4">
                Comprehensive guides for developers and users to integrate with
                our platform.
              </p>
              <Button
                onClick={handleDocsClick}
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-accent bg-transparent hover:cursor-pointer"
              >
                <Icon icon="mdi:external-link" width="24" height="24" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
        <div className="relative glass-box mt-4">
          <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
            <div className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[color:var(--insurance-blue-light)]">
                  <Icon icon="mdi:email" width="24" height="24" />
                </div>
                <div>
                  <div className="text-lg">Contact Support</div>
                  <div>Direct email support</div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[16px] text-gray-300 mb-4">
                Need personalized help? Reach out to our support team directly
                with your inquiries.
              </p>
              <Button
                onClick={() =>
                  (window.location.href =
                    "mailto:someone@example.com?subject=Hello&body=Test")
                }
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-accent bg-transparent hover:cursor-pointer"
              >
                <Icon icon="mdi:email" width="24" height="24" />
                Contact via Email
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Contracts Section */}
      <div className="mb-16 shadow-lg border-none rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="mdi:code" width="24" height="24" />
          <div>
            <div className="text-2xl">Smart Contracts</div>
            <div>Explore our decentralized infrastructure</div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative glass-box mt-4">
              <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  Controller Contract
                </h4>
                <p className="text-[16px] text-gray-300 mb-3">
                  Main policy management and payout logic
                </p>
                <Button
                  onClick={() => handleContractClick(CONTROLLER_CONTRACT)}
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:cursor-pointer"
                >
                  <Icon
                    icon="mdi:external-link"
                    width="24"
                    height="24"
                    className="mr-1"
                  />
                  View
                </Button>
              </div>
            </div>

            <div className="relative glass-box mt-4">
              <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  Oracle Contract
                </h4>
                <p className="text-[16px] text-gray-300 mb-3">
                  Flight data verification and delay detection
                </p>
                <Button
                  onClick={() => handleContractClick(ORACLE_CONTRACT)}
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:cursor-pointer"
                >
                  <Icon
                    icon="mdi:external-link"
                    width="24"
                    height="24"
                    className="mr-1"
                  />
                  View
                </Button>
              </div>
            </div>

            <div className="relative glass-box mt-4">
              <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  Premiums Pool Contract
                </h4>
                <p className="text-[16px] text-gray-300 mb-3">
                  Liquidity pool for premium collection and payouts
                </p>
                <Button
                  onClick={() => handleContractClick(POOL_CONTRACT)}
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:cursor-pointer"
                >
                  <Icon
                    icon="mdi:external-link"
                    width="24"
                    height="24"
                    className="mr-1"
                  />
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16 shadow-lg border-none rounded-xl">
        <div>
          <div className="flex items-center gap-3">
            <Icon icon="mdi:users" width="24" height="24" />
            <div>
              <div className="text-2xl">Frequently Asked Questions</div>
              <div>Common questions about parametric flight insurance</div>
            </div>
          </div>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            value={expandedFaq}
            onValueChange={setExpandedFaq}
          >
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-[color:var(--insurance-blue)] transition-colors">
                  <span className="flex items-start gap-3">
                    <Icon
                      icon="mdi:airplane"
                      width="16"
                      height="16"
                      className="mt-1"
                    />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[16px] text-gray-300 leading-relaxed pl-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
}
