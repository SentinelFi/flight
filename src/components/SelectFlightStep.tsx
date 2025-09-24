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
import { CalendarIcon, Plane, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { FlightData } from "./FlightInsurancePurchase";

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
  const [date, setDate] = useState<Date>();
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
        <p className="text-muted-foreground">
          Find your flight to get coverage
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant={searchMethod === "flightId" ? "default" : "outline"}
          onClick={() => setSearchMethod("flightId")}
        >
          Flight ID
        </Button>
        <Button
          variant={searchMethod === "details" ? "default" : "outline"}
          onClick={() => setSearchMethod("details")}
        >
          Flight Details
        </Button>
      </div>

      {searchMethod === "flightId" ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="flightId">Flight ID</Label>
            <div className="flex gap-2 mt-1">
              <Select value={flightId} onValueChange={setFlightId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select or type flight ID" />
                </SelectTrigger>
                <SelectContent>
                  {dummyFlights.map((flight) => (
                    <SelectItem key={flight.id} value={flight.id}>
                      {flight.id} - {flight.from} to {flight.to}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleFlightIdSearch} disabled={!flightId}>
                Load Flight
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Flight Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>From</Label>
            <Select value={fromAirport} onValueChange={setFromAirport}>
              <SelectTrigger className="mt-1">
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
              <SelectTrigger className="mt-1">
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
              className="w-full"
            >
              Load Flight
            </Button>
          </div>
        </div>
      )}

      {searchResult && (
        <Card className="p-4 border-accent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Plane className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-lg">{searchResult.id}</div>
                <div className="text-sm text-muted-foreground">
                  {searchResult.airline}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>
                  {searchResult.from} → {searchResult.to}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {searchResult.departure} - {searchResult.arrival}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">
              Available
            </span>
            <Button onClick={() => handleSelectFlight(searchResult)}>
              Select Flight
            </Button>
          </div>
        </Card>
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
          <Button onClick={onNext}>Next Step</Button>
        </div>
      )}
    </div>
  );
}
