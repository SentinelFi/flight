"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

interface EnterAmountStepProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function EnterAmountStep({
  amount,
  onAmountChange,
  onNext,
  onPrevious,
}: EnterAmountStepProps) {
  const [inputValue, setInputValue] = useState(amount.toString());
  const walletBalance = 1000; // Mock wallet balance

  const handleAmountChange = (value: string) => {
    setInputValue(value);
    const numValue = Number.parseFloat(value) || 0;
    onAmountChange(numValue);
  };

  const setPercentage = (percentage: number) => {
    const newAmount = (walletBalance * percentage) / 100;
    setInputValue(newAmount.toString());
    onAmountChange(newAmount);
  };

  const setMax = () => {
    setInputValue(walletBalance.toString());
    onAmountChange(walletBalance);
  };

  const isValidAmount = amount >= 1 && amount <= walletBalance;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Enter Amount</h2>
        <p className="text-white">Set your premium amount for coverage</p>
      </div>

      <div className="p-6 shadow-lg border-none rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="mdi:currency-usd" width="24" height="24" />
          <span className="text-lg font-semibold">USDC</span>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Premium Amount</Label>
            <div className="relative mt-1">
              <Input
                id="amount"
                type="number"
                value={inputValue}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Enter amount"
                min="1"
                max={walletBalance}
                className="text-lg pr-16 bg-transparent"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                USDC
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-gray-400">Min: 1 USDC</span>
              <div className="flex items-center gap-1">
                <Icon icon="mdi:wallet" width="24" height="24" />
                <span>Balance: {walletBalance} USDC</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setPercentage(25)}
              className="flex-1 bg-transparent border border-white border-solid"
            >
              25%
            </Button>
            <Button
              size="sm"
              onClick={() => setPercentage(50)}
              className="flex-1 bg-transparent border border-white border-solid"
            >
              50%
            </Button>
            <Button
              size="sm"
              onClick={setMax}
              className="flex-1 bg-transparent border border-white border-solid"
            >
              MAX
            </Button>
          </div>
        </div>

        {amount > 0 && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[16px]">
                <span className="text-gray-300">Premium Amount:</span>
                <span className="font-medium">{amount} USDC</span>
              </div>
              <div className="flex justify-between text-[16px]">
                <span className="text-gray-300">Potential Payout:</span>
                <span className="font-medium text-[#00ff26]">
                  {(amount * 3).toFixed(2)} USDC
                </span>
              </div>
              <div className="flex justify-between text-[16px]">
                <span className="text-gray-300">Coverage Ratio:</span>
                <span className="font-medium">3:1</span>
              </div>
            </div>
          </div>
        )}

        {!isValidAmount && amount > 0 && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">
              {amount < 1
                ? "Minimum premium amount is 1 USDC"
                : "Amount exceeds your wallet balance"}
            </p>
          </div>
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
          onClick={onNext}
          disabled={!isValidAmount}
          className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
