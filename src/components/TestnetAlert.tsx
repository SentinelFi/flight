import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import Link from "next/link";

const TestnetAlert = () => {
  return (
    <Alert className="mb-12 shadow-lg border-none rounded-xl">
      <AlertTriangle className="h-5 w-5" />
      <AlertDescription className="text-sm leading-relaxed">
        <strong>Testnet Version:</strong> This is a testing environment. Mainnet
        launch coming soon. Expect bugs and issues - please{" "}
        <Link
          href="https://github.com/SentinelFi"
          className="underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          report everything here
        </Link>
        . Thank you for helping us improve! 🚀
      </AlertDescription>
    </Alert>
  );
};

export default TestnetAlert;
