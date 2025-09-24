"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, MapPin, Shield, Users, Settings } from "lucide-react";
import type { FlightData } from "./FlightInsurancePurchase";

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
        <h2 className="text-2xl font-semibold mb-2">Review Details</h2>
        <p className="text-muted-foreground">
          Verify your flight and insurance information
        </p>
      </div>

      <Card className="p-6 shadow-lg border-none rounded-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-accent/10 rounded-lg">
            <Plane className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{flight.id}</h3>
            <p className="text-muted-foreground">
              {flight.airline} • {flight.aircraft}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="font-medium">
                {flight.from} → {flight.to}
              </div>
              <div className="text-sm text-muted-foreground">Route</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="font-medium">
                {flight.departure} - {flight.arrival}
              </div>
              <div className="text-sm text-muted-foreground">{flight.date}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-lg border-none rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Insurance Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Asset:</span>
              <span className="font-medium">USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Active
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Event Time:</span>
              <span className="font-medium">Departure + 2h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trigger Value:</span>
              <span className="font-medium">120 minutes delay</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Oracle:</span>
              <span className="font-medium">Acurast</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolution:</span>
              <span className="font-medium">Automatic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Admin Fee:</span>
              <span className="font-medium">2.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Performance Fee:</span>
              <span className="font-medium">5%</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Current Pool Size:</span>
            </div>
            <span className="text-xl font-semibold">$45,230 USDC</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/50 shadow-lg border-none rounded-xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Settings className="w-4 h-4" />
          <span>Historical flight data (delayed, on-time) - Coming Soon</span>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext}>Next Step</Button>
      </div>
    </div>
  );
}
