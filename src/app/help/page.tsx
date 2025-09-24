"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Github,
  FileText,
  Code,
  Mail,
  ExternalLink,
  Plane,
  Users,
} from "lucide-react";
import TestnetAlert from "@/components/TestnetAlert";

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
    answer: "Premiums are dynamically calculated based on formula...",
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
          Help Center
        </h1>
        <p className="text-md mt-4 text-muted-foreground text-balance">
          Get immediate assistance with your flight delay insurance. Access
          answers, report issues, and request new features through our
          comprehensive support center.
        </p>
      </div>

      <TestnetAlert />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card className="shadow-lg border-none rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[color:var(--insurance-blue-light)]">
                <Github className="h-5 w-5 text-[color:var(--insurance-blue)]" />
              </div>
              <div>
                <CardTitle className="text-lg">Report Issues</CardTitle>
                <CardDescription>
                  Bug reports & feature requests
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Found a bug or have an idea? Help us improve by reporting issues
              on GitHub.
            </p>
            <Button
              onClick={handleIssuesClick}
              variant="outline"
              size="sm"
              className="w-full group-hover:bg-accent bg-transparent hover:cursor-pointer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open GitHub Issues
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-none rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[color:var(--insurance-blue-light)]">
                <FileText className="h-5 w-5 text-[color:var(--insurance-blue)]" />
              </div>
              <div>
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>API docs & integration guides</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive guides for developers and users to integrate with
              our platform.
            </p>
            <Button
              onClick={handleDocsClick}
              variant="outline"
              size="sm"
              className="w-full group-hover:bg-accent bg-transparent hover:cursor-pointer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-none rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[color:var(--insurance-blue-light)]">
                <Mail className="h-5 w-5 text-[color:var(--insurance-blue)]" />
              </div>
              <div>
                <CardTitle className="text-lg">Contact Support</CardTitle>
                <CardDescription>Direct email support</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need personalized help? Reach out to our support team directly.
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
              <Mail className="h-4 w-4 mr-2" />
              Contact via Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Smart Contracts Section */}
      <Card className="mb-16 shadow-lg border-none rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Code className="h-6 w-6" />
            <div>
              <CardTitle className="text-2xl">Smart Contracts</CardTitle>
              <CardDescription>
                Explore our decentralized infrastructure
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                Controller Contract
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Main policy management and payout logic
              </p>
              <Button
                onClick={() => handleContractClick(CONTROLLER_CONTRACT)}
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:cursor-pointer"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                Oracle Contract
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Flight data verification and delay detection
              </p>
              <Button
                onClick={() => handleContractClick(ORACLE_CONTRACT)}
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:cursor-pointer"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                Premiums Pool
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Liquidity pool for premium collection and payouts
              </p>
              <Button
                onClick={() => handleContractClick(POOL_CONTRACT)}
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:cursor-pointer"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-16 shadow-lg border-none rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-[color:var(--insurance-blue)]" />
            <div>
              <CardTitle className="text-2xl">
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Common questions about parametric flight insurance
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                    <Plane className="h-4 w-4 mt-1 flex-shrink-0 text-[color:var(--insurance-blue)]" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pl-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
