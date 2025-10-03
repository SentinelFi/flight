"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import type { FlightData } from "./FlightInsurancePurchase";

interface ConfirmStepProps {
  flight: FlightData | null;
  amount: number;
  onConfirm: () => void;
  onPrevious: () => void;
}

const insuranceTerms = `
SENTINEL DECENTRALIZED FLIGHT DELAY INSURANCE POLICY

TERMS AND CONDITIONS

1. COVERAGE DETAILS
This insurance policy provides coverage for flight delays exceeding configured time from the scheduled departure time. Coverage is provided through a decentralized insurance protocol utilizing smart contracts on the Stellar blockchain.

2. PREMIUM AND PAYOUT
- Premium Amount: As specified in your purchase
- Payout Ratio: 3:1 (three times your premium amount)
- Asset: USDC (USD Coin)
- Automatic payout upon confirmed delay trigger

3. TRIGGER CONDITIONS
Coverage is activated when:
- Your flight is delayed by 120 minutes or more from scheduled departure
- Delay is confirmed by Acurast oracle network
- Flight operates on the scheduled date

4. EXCLUSIONS
This policy does not cover:
- Delays caused by passenger actions
- Strikes or labor disputes
- Government or regulatory actions

5. CLAIMS PROCESS
- Claims are processed automatically via smart contract
- Oracle verification required for payout trigger
- Payouts are distributed after confirmation

6. FEES
- Admin Fee: 2.5% of premium
- Performance Fee: 5% of payout (if applicable)
- Network transaction fees apply

7. RISK DISCLOSURE
- This is an experimental DeFi insurance product
- Smart contract risks apply
- Regulatory changes may impact coverage

8. DISPUTE RESOLUTION
- Disputes resolved through decentralized arbitration
- Oracle data is considered authoritative
- Appeals process available for technical errors

9. PRIVACY
- Flight data is stored on-chain for verification
- Data retention as per blockchain immutability

10. GOVERNING LAW
This agreement is governed by the laws of the jurisdiction where the smart contract is deployed and international maritime law principles for decentralized protocols.

By purchasing this insurance, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.

IMPORTANT: This is a decentralized parametric insurance product. Traditional insurance regulations may not apply. Participate at your own risk.

Generated: 2025
Protocol Version: 1.0
Smart Contract Address:

For technical support, visit our documentation or contact the community support channels.
`;

export default function ConfirmStep({
  flight,
  amount,
  onConfirm,
  onPrevious,
}: ConfirmStepProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    if (isAtBottom) {
      setHasScrolledToBottom(true);
    }
  };

  if (!flight) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Confirm Purchase</h2>
        <p className="text-white">
          Review and agree to the insurance policy terms
        </p>
      </div>

      <div className="p-6 shadow-lg border-none rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Purchase Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Flight:</span>
            <span className="font-medium">
              {flight.id} ({flight.from} → {flight.to})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Date:</span>
            <span className="font-medium">{flight.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Premium Amount:</span>
            <span className="font-medium">{amount} USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Potential Payout:</span>
            <span className="font-medium text-[#00ff26]">
              {(amount * 3).toFixed(2)} USDC
            </span>
          </div>
          <div className="flex justify-between border-t pt-3 border-gray-200">
            <span className="font-semibold">Total Cost:</span>
            <span className="font-semibold">{amount} USDC</span>
          </div>
        </div>
      </div>

      <div className="p-6 shadow-lg border-none rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Insurance Policy Terms</h3>
        <ScrollArea
          className="h-64 w-full border rounded-md p-4 border-gray-200"
          onScrollCapture={handleScroll}
        >
          <div className="text-sm whitespace-pre-line leading-relaxed">
            {insuranceTerms}
          </div>
        </ScrollArea>

        <div className="mt-4 flex items-center space-x-2">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            disabled={!hasScrolledToBottom}
            className="bg-white"
          />
          <label
            htmlFor="agree"
            className={`text-[16px] ${
              !hasScrolledToBottom ? "text-white-200" : "text-white"
            }`}
          >
            I have read and agree to the insurance policy terms and conditions
          </label>
        </div>

        {!hasScrolledToBottom && (
          <p className="text-[16px] text-white mt-2">
            Please scroll to the bottom of the terms to continue
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="bg-white text-black rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer"
        >
          Previous Step
        </Button>
        <Button
          onClick={onConfirm}
          disabled={!agreed || !hasScrolledToBottom}
          className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer"
        >
          Agree and Confirm Purchase
        </Button>
      </div>
    </div>
  );
}
