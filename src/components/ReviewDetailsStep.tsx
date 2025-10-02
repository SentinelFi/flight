"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FlightData } from "./FlightInsurancePurchase";
import { Icon } from "@iconify/react";

interface ReviewDetailsStepProps {
  flight: FlightData | null;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ReviewDetailsStep({
  flight,
  onNext,
  onPrevious,
}: ReviewDetailsStepProps) {
  if (!flight) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-2">Review Details</h2>
        <p>Verify your flight and insurance information</p>
      </div>

      <div className="p-6 shadow-lg border-none rounded-xl">
        <div className="flex items-center gap-4 mb-6">
          <Icon icon="mdi:airplane" width="24" height="24" />
          <div>
            <h3 className="text-xl font-semibold">{flight.id}</h3>
            <p className="text-gray-400">
              {flight.airline} • {flight.aircraft}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:map" width="24" height="24" />
            <div>
              <div className="font-medium">
                {flight.from} → {flight.to}
              </div>
              <div className="text-sm text-gray-400">Route</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icon icon="mdi:clock" width="24" height="24" />
            <div>
              <div className="font-medium">
                {flight.departure} - {flight.arrival}
              </div>
              <div className="text-sm text-gray-400">{flight.date}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 shadow-lg border-none rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Insurance Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Asset:</span>
              <span className="font-medium">USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Status:</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Active
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Event Time:</span>
              <span className="font-medium">Departure + 2h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Trigger Value:</span>
              <span className="font-medium">120 minutes delay</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Oracle:</span>
              <span className="font-medium">Acurast</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Resolution:</span>
              <span className="font-medium">Automatic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Admin Fee:</span>
              <span className="font-medium">2.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Performance Fee:</span>
              <span className="font-medium">5%</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:users" width="24" height="24" />
              <span className="text-gray-300">Current Pool Size:</span>
            </div>
            <span className="text-xl font-semibold">$45,230 USDC</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/5 text-white shadow-lg border-none rounded-xl">
        <div className="flex items-center gap-2 text-[16px]">
          <Icon icon="mdi:settings" width="24" height="24" />
          <span>Historical flight data (delayed, on-time) - Coming Soon</span>
        </div>
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
          className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
