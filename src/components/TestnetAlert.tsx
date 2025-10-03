import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import Link from "next/link";

const TestnetAlert = () => {
  return (
    <Alert className="mb-12 shadow-lg border-none rounded-xl bg-red-100">
      <div className="flex items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-red-600" />
        <AlertDescription className="text-[16px] leading-relaxed ml-6">
          <strong>Testnet Version:</strong> This is a testing environment.
          Mainnet launch coming soon. Expect bugs and issues - please{" "}
          <Link
            href="https://github.com/SentinelFi/flight/issues"
            className="underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            report everything here
          </Link>
          . Thank you for helping us improve! 🚀
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default TestnetAlert;
