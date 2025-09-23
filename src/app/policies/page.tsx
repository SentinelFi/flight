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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Plane,
  Clock,
  DollarSign,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  {
    id: "POL-20-002",
    flightNumber: "UA5678",
    description: "San Francisco to Chicago - Economy",
    flightDateTime: "2025-01-20T09:15:00Z",
    status: "Expired",
    isClaimed: true,
    tokenAmount: 250,
    tokenAsset: "USDC",
  },
  {
    id: "POL-20-003",
    flightNumber: "DL9012",
    description: "Miami to Seattle - Premium Economy",
    flightDateTime: "2025-06-25T16:45:00Z",
    status: "Pending",
    isClaimed: false,
    tokenAmount: 350,
    tokenAsset: "USDC",
  },
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

  return (
    <div>
      <div className="mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-balance">Policies</h1>
        </div>
        <p className="text-xl text-gray-500 text-pretty">
          Your decentralized flight insurance policies at a glance.
        </p>
      </div>

      <div className="mx-auto px-6 py-8 space-y-8">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 animate-fadeIn">
          <Image
            src="/flightpolicies.png"
            alt="Flight insurance banner"
            width={1536}
            height={512}
            className="opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center">
            <div className="px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Fly with Confidence
              </h2>
              <p className="text-muted-foreground">
                Stellar blockchain-powered protection for every journey
              </p>
            </div>
          </div>
        </div>

        {/* Learn More Section */}
        <Card className="border-none bg-white rounded-xl">
          <Collapsible open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      How Premium Policies Work
                    </CardTitle>
                    <CardDescription>
                      Learn about our decentralized insurance mechanism
                    </CardDescription>
                  </div>
                  {learnMoreOpen ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Our premium policies use smart contracts on the Stellar
                    blockchain to provide transparent, automated flight
                    insurance coverage. Here's how it works:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">
                        1. Purchase Coverage
                      </h4>
                      <p>
                        Pay premiums using tokens to secure your flight against
                        delays and cancellations.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">
                        2. Automated Monitoring
                      </h4>
                      <p>
                        Our oracle system tracks flight data in real-time for
                        accurate claim processing.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">
                        3. Instant Payouts
                      </h4>
                      <p>
                        Claims are processed automatically when flight
                        disruptions meet policy conditions.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">
                        4. Transparent Process
                      </h4>
                      <p>
                        All transactions are recorded on-chain for complete
                        transparency and trust.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-none bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Policies
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPolicies}</div>
              <p className="text-xs text-muted-foreground">
                Active and historical coverage
              </p>
            </CardContent>
          </Card>
          <Card className="border-none bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Value Insured
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalValueInsured.toLocaleString()} USD
              </div>
              <p className="text-xs text-muted-foreground">
                Cumulative coverage amount
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/50">
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="history" disabled>
              History (Coming Soon)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-6">
            <div className="grid gap-6">
              {dummyPolicies.map((policy) => (
                <Card
                  key={policy.id}
                  className="hover:bg-muted/30 transition-colors border-none bg-white rounded-xl"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-primary" />
                          {policy.flightNumber}
                        </CardTitle>
                        <CardDescription>{policy.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(policy.status)}>
                        {policy.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Policy ID
                        </p>
                        <p className="font-mono text-sm">{policy.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Flight Date
                        </p>
                        <p className="text-sm flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(policy.flightDateTime)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Coverage Amount
                        </p>
                        <p className="text-sm font-semibold">
                          {policy.tokenAmount} {policy.tokenAsset}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Claim Status
                        </p>
                        <p className="text-sm">
                          {policy.isClaimed ? (
                            <span className="text-green-400">✓ Claimed</span>
                          ) : (
                            <span className="text-muted-foreground">
                              Not Claimed
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/policies/${policy.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-none bg-white rounded-xl">
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">
                    History Coming Soon
                  </h3>
                  <p>
                    Detailed policy history and analytics will be available in a
                    future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Smart Contracts Section */}
        <Card className="border-none bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Smart Contracts
            </CardTitle>
            <CardDescription>
              View our deployed contracts on Stellar testnet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {smartContracts.map((contract) => (
                <div
                  key={contract.name}
                  className="p-4 rounded-lg border border-border bg-muted/30"
                >
                  <h4 className="font-semibold mb-2">{contract.name}</h4>
                  <p className="text-xs text-muted-foreground font-mono mb-3 break-all">
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
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View on Explorer
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card className="border-none bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alerts
            </CardTitle>
            <CardDescription>
              Stay informed about your policies and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-semibold mb-2">
                Alerts Coming Soon
              </h3>
              <p>
                Subscribe to important system alerts about your policies and
                events.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
