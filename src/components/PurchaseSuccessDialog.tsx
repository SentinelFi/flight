"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink } from "lucide-react";

interface PurchaseSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PurchaseSuccessDialog({
  open,
  onOpenChange,
}: PurchaseSuccessDialogProps) {
  const transactionHash = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0";
  const transactionUrl = `https://stellar.expert/explorer/testnet/tx/${transactionHash}`;

  useEffect(() => {
    if (open) {
      // Create fireworks effect
      const fireworksContainer = document.createElement("div");
      fireworksContainer.className = "fireworks";
      document.body.appendChild(fireworksContainer);

      const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
      ];

      const createFirework = (x: number, y: number) => {
        for (let i = 0; i < 12; i++) {
          const firework = document.createElement("div");
          firework.className = "firework";
          firework.style.left = x + "px";
          firework.style.top = y + "px";
          firework.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

          const angle = i * 30 * (Math.PI / 180);
          const distance = 50 + Math.random() * 50;
          const endX = x + Math.cos(angle) * distance;
          const endY = y + Math.sin(angle) * distance;

          firework.style.setProperty("--end-x", endX + "px");
          firework.style.setProperty("--end-y", endY + "px");

          fireworksContainer.appendChild(firework);

          setTimeout(() => {
            if (firework.parentNode) {
              firework.parentNode.removeChild(firework);
            }
          }, 1000);
        }
      };

      // Create multiple fireworks
      const fireworkInterval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y =
          Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
        createFirework(x, y);
      }, 200);

      // Clean up after 3 seconds
      setTimeout(() => {
        clearInterval(fireworkInterval);
        if (fireworksContainer.parentNode) {
          fireworksContainer.parentNode.removeChild(fireworksContainer);
        }
      }, 3000);

      return () => {
        clearInterval(fireworkInterval);
        if (fireworksContainer.parentNode) {
          fireworksContainer.parentNode.removeChild(fireworksContainer);
        }
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#7d00ff] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Insurance Purchased!
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          <div className="text-4xl">🎉</div>
          <p>
            Your flight delay insurance has been successfully purchased and is
            now active.
          </p>

          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Transaction Details</p>
            <div className="flex items-center justify-between text-[16px]">
              <span>Transaction Hash:</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-[16px]"
                onClick={() => window.open(transactionUrl, "_blank")}
              >
                {transactionHash.slice(0, 8)}...{transactionHash.slice(-8)}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>

          <div className="text-[16px]">
            You will receive a payout if your flight is delayed by 120+ minutes.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
