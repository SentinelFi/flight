"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { FlightData } from "./FlightInsurancePurchase";
import { Icon } from "@iconify/react";

// Dummy flight data
const dummyFlights: FlightData[] = [
  {
    id: "AA1234",
    from: "JFK",
    to: "LAX",
    date: "2025-10-15",
    departure: "08:00",
    arrival: "11:30",
    airline: "American Airlines",
    aircraft: "Boeing 737",
  },
  {
    id: "UA5678",
    from: "SFO",
    to: "ORD",
    date: "2025-10-16",
    departure: "14:20",
    arrival: "20:15",
    airline: "United Airlines",
    aircraft: "Airbus A320",
  },
  {
    id: "DL9012",
    from: "ATL",
    to: "MIA",
    date: "2025-10-17",
    departure: "16:45",
    arrival: "18:30",
    airline: "Delta Air Lines",
    aircraft: "Boeing 757",
  },
];

const airports = [
  { code: "JFK", name: "John F. Kennedy International" },
  { code: "LAX", name: "Los Angeles International" },
  { code: "SFO", name: "San Francisco International" },
  { code: "ORD", name: "O'Hare International" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International" },
  { code: "MIA", name: "Miami International" },
];

interface SelectFlightStepProps {
  onFlightSelect: (flight: FlightData) => void;
  selectedFlight: FlightData | null;
  onNext: () => void;
}

export default function SelectFlightStep({
  onFlightSelect,
  selectedFlight,
  onNext,
}: SelectFlightStepProps) {
  const [searchMethod, setSearchMethod] = useState<"flightId" | "details">(
    "flightId"
  );
  const [flightId, setFlightId] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [searchResult, setSearchResult] = useState<FlightData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleFlightIdSearch = () => {
    const flight = dummyFlights.find(
      (f) => f.id.toLowerCase() === flightId.toLowerCase()
    );
    if (flight) {
      setSearchResult(flight);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleDetailsSearch = () => {
    if (!date || !fromAirport || !toAirport) return;

    const flight = dummyFlights.find(
      (f) =>
        f.from === fromAirport &&
        f.to === toAirport &&
        f.date === format(date, "yyyy-MM-dd")
    );

    if (flight) {
      setSearchResult(flight);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleSelectFlight = (flight: FlightData) => {
    onFlightSelect(flight);
    setSearchResult(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Search</h2>
        <p className="text-gray-400">Find your flight to get coverage</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          className={
            searchMethod === "flightId"
              ? "bg-[#ffa7a7] text-black rounded-full cursor-pointer hover:text-white"
              : "bg-black text-white rounded-full cursor-pointer"
          }
          onClick={() => setSearchMethod("flightId")}
        >
          Flight ID
        </Button>
        <Button
          className={
            searchMethod === "details"
              ? "bg-[#ffa7a7] text-black rounded-full cursor-pointer hover:text-white"
              : "bg-black text-white rounded-full cursor-pointer"
          }
          onClick={() => setSearchMethod("details")}
        >
          Flight Details
        </Button>
      </div>

      {searchMethod === "flightId" ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="flightId" className="text-[16px]">
              Flight ID
            </Label>
            <div className="flex gap-2 mt-1">
              <Select value={flightId} onValueChange={setFlightId}>
                <SelectTrigger className="flex-1 bg-transparent text-[16px]">
                  <SelectValue placeholder="Select or type flight ID" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  {dummyFlights.map((flight) => (
                    <SelectItem key={flight.id} value={flight.id}>
                      {flight.id} - {flight.from} to {flight.to}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleFlightIdSearch}
                disabled={!flightId}
                className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer hover:text-white"
              >
                Load Flight
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Flight Date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild className="bg-transparent">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1"
                  )}
                >
                  <Icon icon="mdi:calendar" width="24" height="24" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  onSelect={(d) => {
                    setDate(d);
                    setCalendarOpen(false);
                  }}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>From</Label>
            <Select value={fromAirport} onValueChange={setFromAirport}>
              <SelectTrigger className="mt-1 bg-transparent">
                <SelectValue placeholder="Departure airport" />
              </SelectTrigger>
              <SelectContent>
                {airports.map((airport) => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.code} - {airport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>To</Label>
            <Select value={toAirport} onValueChange={setToAirport}>
              <SelectTrigger className="mt-1 bg-transparent">
                <SelectValue placeholder="Arrival airport" />
              </SelectTrigger>
              <SelectContent>
                {airports.map((airport) => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.code} - {airport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <Button
              onClick={handleDetailsSearch}
              disabled={!date || !fromAirport || !toAirport}
              className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer hover:text-white"
            >
              Load Flight
            </Button>
          </div>
        </div>
      )}

      {searchResult && (
        <div className="p-4 border-accent bg-black rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon icon="mdi:airplane" width="24" height="24" />
              <div>
                <div className="font-semibold text-lg">{searchResult.id}</div>
                <div className="text-sm text-muted-foreground">
                  {searchResult.airline}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm">
                <Icon icon="mdi:map" width="24" height="24" />
                <span>
                  {searchResult.from} → {searchResult.to}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon icon="mdi:clock" width="24" height="24" />
                <span>
                  {searchResult.departure} - {searchResult.arrival}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#00ff26]">
              Available
            </span>
            <Button
              onClick={() => handleSelectFlight(searchResult)}
              className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer hover:text-white"
            >
              Select Flight
            </Button>
          </div>
        </div>
      )}

      {notFound && (
        <Card className="p-4 shadow-lg border-none rounded-xl text-center">
          <p className="text-sm text-muted-foreground">
            Sorry, we couldn't find flight data for your search.
          </p>
          <Button variant="outline" disabled className="mt-2 bg-transparent">
            Create Flight Insurance (Coming Soon)
          </Button>
        </Card>
      )}

      {selectedFlight && (
        <div className="flex justify-end">
          <Button
            onClick={onNext}
            className="bg-[#00FF26] text-[#0C0B17] rounded-[100px] p-[10px] font-bold text-[16px] my-auto hover:cursor-pointer hover:text-white"
          >
            Next Step
          </Button>
        </div>
      )}
    </div>
  );
}
