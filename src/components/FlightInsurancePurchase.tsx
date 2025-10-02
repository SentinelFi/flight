import { useState } from "react";
import { Card } from "@/components/ui/card";
import StepIndicator from "@/components/StepIndicator";
import SelectFlightStep from "@/components/SelectFlightStep";
import ReviewDetailsStep from "@/components/ReviewDetailsStep";
import EnterAmountStep from "@/components/EnterAmountStep";
import ConfirmStep from "@/components/ConfirmStep";
import PurchaseSuccessDialog from "@/components/PurchaseSuccessDialog";
import TestnetAlert from "./TestnetAlert";

export interface FlightData {
  id: string;
  from: string;
  to: string;
  date: string;
  departure: string;
  arrival: string;
  airline: string;
  aircraft: string;
}

const steps = [
  { id: 1, title: "Select Flight", description: "Choose your flight" },
  { id: 2, title: "Review Details", description: "Verify information" },
  { id: 3, title: "Enter Amount", description: "Set premium amount" },
  { id: 4, title: "Confirm", description: "Complete purchase" },
];

export default function FlightInsurancePurchase() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [premiumAmount, setPremiumAmount] = useState<number>(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFlightSelect = (flight: FlightData) => {
    setSelectedFlight(flight);
  };

  const handleAmountChange = (amount: number) => {
    setPremiumAmount(amount);
  };

  const handlePurchaseComplete = () => {
    setShowSuccessDialog(true);
    // setTimeout(() => {
    //   //   setCurrentStep(1);
    //   setSelectedFlight(null);
    //   setPremiumAmount(0);
    //   setShowSuccessDialog(false);
    // }, 5000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectFlightStep
            onFlightSelect={handleFlightSelect}
            selectedFlight={selectedFlight}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <ReviewDetailsStep
            flight={selectedFlight}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        );
      case 3:
        return (
          <EnterAmountStep
            amount={premiumAmount}
            onAmountChange={handleAmountChange}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        );
      case 4:
        return (
          <ConfirmStep
            flight={selectedFlight}
            amount={premiumAmount}
            onConfirm={handlePurchaseComplete}
            onPrevious={handlePreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[40px] font-bold mb-2 text-[24px] text-center max-w-[750px]">
            Get Covered
          </h1>
          <p className="mt-4 text-[20px] text-center max-w-[750px]">
            Protect your travel plans with decentralized flight delay insurance
          </p>
        </div>

        <TestnetAlert />

        <div className="relative glass-box mt-4">
          <div className="p-8 bg-[#0F0A28]/15 backdrop-blur-md rounded-[7px]">
            <StepIndicator steps={steps} currentStep={currentStep} />
            <div className="mt-8">{renderCurrentStep()}</div>
          </div>
        </div>
      </div>

      <PurchaseSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  );
}
