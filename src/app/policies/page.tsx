"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
// import { useStellarWallet } from "@/contexts/StellarWalletContext";
// import WalletNotConnected from "@/components/WalletNotConnected";
import TestnetAlert from "@/components/TestnetAlert";
import { Icon } from "@iconify/react";

const dummyPolicies = [
  {
    id: "POL-20-001",
    flightNumber: "AA1234",
    description: "New York to Los Angeles - Business Class",
    flightDateTime: "2026-01-15T14:30:00Z",
    status: "Active",
    isClaimed: false,
    tokenAmount: 500,
    tokenAsset: "USDC",
  },
  // {
  //   id: "POL-20-002",
  //   flightNumber: "UA5678",
  //   description: "San Francisco to Chicago - Economy",
  //   flightDateTime: "2025-01-20T09:15:00Z",
  //   status: "Expired",
  //   isClaimed: true,
  //   tokenAmount: 250,
  //   tokenAsset: "USDC",
  // },
  // {
  //   id: "POL-20-003",
  //   flightNumber: "DL9012",
  //   description: "Miami to Seattle - Premium Economy",
  //   flightDateTime: "2025-06-25T16:45:00Z",
  //   status: "Pending",
  //   isClaimed: false,
  //   tokenAmount: 350,
  //   tokenAsset: "USDC",
  // },
];

const smartContracts = [
  {
    name: "Controller",
    address: "CDK75NIW7HZA6VPT2E6ELAP554HI2FFVW7ZYFSKRCZZYQIH6LJO73TTB",
    url: "https://stellar.expert/explorer/testnet/contract/CDK75NIW7HZA6VPT2E6ELAP554HI2FFVW7ZYFSKRCZZYQIH6LJO73TTB",
  },
  {
    name: "Premiums Pool",
    address: "CCNBVNQ2VSSURNZ47H4IOHMNVNMILXM4ND6QVTL3MK3VJSIIZNBEPUHI",
    url: "https://stellar.expert/explorer/testnet/contract/CCNBVNQ2VSSURNZ47H4IOHMNVNMILXM4ND6QVTL3MK3VJSIIZNBEPUHI",
  },
  {
    name: "Oracle",
    address: "CAQMX4I3VBPH7Z4WJEY4UHAWRPEX5HV5CKH4VMLQS42CUTCNOYBD2KTK",
    url: "https://stellar.expert/explorer/testnet/contract/CAQMX4I3VBPH7Z4WJEY4UHAWRPEX5HV5CKH4VMLQS42CUTCNOYBD2KTK",
  },
];

export default function PoliciesPage() {
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  // const { isConnected, address } = useStellarWallet();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "expired":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const totalPolicies = dummyPolicies.length;
  const totalValueInsured = dummyPolicies.reduce(
    (sum, policy) => sum + policy.tokenAmount,
    0
  );

  // if (!isConnected || !address) return <WalletNotConnected />;

  return (
    <div className="min-h-screen py-8 px-4 text-white mb-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[40px] font-bold mb-2 text-center max-w-[750px] mx-auto">
            Insurance Policies
          </h1>
          <p className="mt-4 text-[20px] text-center max-w-[750px] mx-auto">
            Your decentralized flight insurance policies at a glance
          </p>
        </div>

        <TestnetAlert />
      </div>

      <div className="mx-auto px-6 py-8 space-y-8 max-w-5xl">
        {/* Learn More Section */}
        <div className="relative glass-box mt-4">
          <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
            <Collapsible open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
              <CollapsibleTrigger asChild>
                <div className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:file-text" width="24" height="24" />
                        How Premium Policies Work
                      </div>
                      <div>
                        Learn about our decentralized insurance mechanism
                      </div>
                    </div>
                    <Icon
                      icon={
                        learnMoreOpen ? "mdi:chevron-up" : "mdi:chevron-down"
                      }
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pt-0">
                  <div className="space-y-4 text-[16px]">
                    <p>
                      Our premium policies use smart contracts on the Stellar
                      blockchain to provide transparent, automated flight
                      insurance coverage. Here's how it works:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">1. Purchase Coverage</h4>
                        <p>
                          Pay premiums using tokens to secure your flight
                          against delays and cancellations.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">
                          2. Automated Monitoring
                        </h4>
                        <p>
                          Our oracle system tracks flight data in real-time for
                          accurate claim processing.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">3. Instant Payouts</h4>
                        <p>
                          Claims are processed automatically when flight
                          disruptions meet policy conditions.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">
                          4. Transparent Process
                        </h4>
                        <p>
                          All transactions are recorded on-chain for complete
                          transparency and trust.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative glass-box mt-4">
            <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-[16px] font-medium">Total Policies</div>
                <Icon icon="mdi:file-text" width="24" height="24" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalPolicies}</div>
                <p className="text-[16px] text-gray-400">
                  Active and historical coverage
                </p>
              </div>
            </div>
          </div>
          <div className="relative glass-box mt-4">
            <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-[16px] font-medium">
                  Total Value Insured
                </div>
                <Icon icon="mdi:currency-usd" width="24" height="24" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ${totalValueInsured.toLocaleString()} USD
                </div>
                <p className="text-[16px] text-muted-foreground">
                  Cumulative coverage amount
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger
              value="policies"
              className="tabs font-bold text-[16px]"
            >
              Policies
            </TabsTrigger>
            <TabsTrigger
              value="history"
              disabled
              className="font-bold text-[16px]"
            >
              History (Coming Soon)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-6">
            <div className="grid gap-6">
              {dummyPolicies.map((policy) => (
                <div key={policy.id} className="relative glass-box mt-4">
                  <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:airplane" width="32" height="32" />
                            {policy.flightNumber}
                          </div>
                          <div>{policy.description}</div>
                        </div>
                        <Badge className={getStatusColor(policy.status)}>
                          {policy.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-1">
                          <p className="text-[16px] text-gray-400">Policy ID</p>
                          <p className="font-mono text-[16px]">{policy.id}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[16px] text-gray-400">
                            Flight Date
                          </p>
                          <p className="text-sm flex items-center gap-1">
                            <Icon icon="mdi:clock" width="24" height="24" />
                            {formatDate(policy.flightDateTime)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[16px] text-gray-400">
                            Coverage Amount
                          </p>
                          <p className="text-sm font-semibold">
                            {policy.tokenAmount} {policy.tokenAsset}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[16px] text-gray-400">
                            Claim Status
                          </p>
                          <p className="text-sm">
                            {policy.isClaimed ? (
                              <span className="text-green-400">✓ Claimed</span>
                            ) : (
                              <span className="text-[16px] text-gray-400">
                                Not Claimed
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/policies/${policy.id}`}>
                          <Icon
                            icon="mdi:external-link"
                            width="16"
                            height="16"
                          />
                          <span>View Details</span>
                        </Link>
                        <Button
                          size="sm"
                          disabled={
                            policy.isClaimed || policy.status === "Expired"
                          }
                          className="cursor-pointer bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 font-medium px-4 py-2 rounded-full shadow-lg shadow-yellow-500/25"
                        >
                          Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="border-none bg-white rounded-xl">
              <div className="py-8">
                <div className="text-center text-muted-foreground">
                  <Icon icon="mdi:clock" width="24" height="24" />
                  <h3 className="text-lg font-semibold mb-2">
                    History Coming Soon
                  </h3>
                  <p>
                    Detailed policy history and analytics will be available in a
                    future update.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Smart Contracts Section */}
        <div className="relative glass-box mt-4">
          <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
            <div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:external-link" width="24" height="24" />
                Smart Contracts
              </div>
              <div>View deployed contracts on Stellar testnet</div>
            </div>
            <div>
              <div className="grid md:grid-cols-3 gap-4">
                {smartContracts.map((contract) => (
                  <div
                    key={contract.name}
                    className="p-4 rounded-lg bg-white/5"
                  >
                    <h4 className="font-semibold mb-2">{contract.name}</h4>
                    <p className="text-xs text-gray-300 font-mono mb-3 break-all">
                      {contract.address}
                    </p>
                    <Button
                      size="sm"
                      asChild
                      className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 font-medium px-4 py-2 rounded-full shadow-lg shadow-yellow-500/25"
                    >
                      <a
                        href={contract.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon icon="mdi:external-link" width="24" height="24" />
                        View on Explorer
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="relative glass-box mt-4">
          <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
            <div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:alert" width="24" height="24" />
                Alerts
              </div>
              <div>Stay informed about your policies and system events</div>
            </div>
            <div>
              <div className="text-center py-8 text-muted-foreground">
                <Icon
                  icon="mdi:alert"
                  width="64"
                  height="64"
                  className="mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">
                  Alerts Coming Soon
                </h3>
                <p>
                  Subscribe to important system alerts about your policies and
                  events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
