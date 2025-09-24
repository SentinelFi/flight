"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { DollarSign, Wallet } from "lucide-react";

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
        <p className="text-muted-foreground">
          Set your premium amount for coverage
        </p>
      </div>

      <Card className="p-6 shadow-lg border-none rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-accent" />
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
                className="text-lg pr-16"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                USDC
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-muted-foreground">Min: 1 USDC</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Wallet className="w-4 h-4" />
                <span>Balance: {walletBalance} USDC</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPercentage(25)}
              className="flex-1"
            >
              25%
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPercentage(50)}
              className="flex-1"
            >
              50%
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={setMax}
              className="flex-1 bg-transparent"
            >
              MAX
            </Button>
          </div>
        </div>

        {amount > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Premium Amount:</span>
                <span className="font-medium">{amount} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Potential Payout:</span>
                <span className="font-medium text-green-600">
                  {(amount * 3).toFixed(2)} USDC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coverage Ratio:</span>
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
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext} disabled={!isValidAmount}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
