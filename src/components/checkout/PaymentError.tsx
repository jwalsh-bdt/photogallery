import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "../ui/button";

interface PaymentErrorProps {
  errorMessage?: string;
  errorCode?: string;
  onRetry?: () => void;
  onChangeMethod?: () => void;
}

const PaymentError = ({
  errorMessage = "Your payment could not be processed at this time.",
  errorCode = "ERR_PAYMENT_FAILED",
  onRetry = () => console.log("Retry payment"),
  onChangeMethod = () => console.log("Change payment method"),
}: PaymentErrorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">
          Payment Failed
        </AlertTitle>
        <AlertDescription>
          {errorMessage}
          {errorCode && (
            <span className="block text-xs mt-1 opacity-75">
              Error code: {errorCode}
            </span>
          )}
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">
            Common reasons for payment failures:
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Insufficient funds in your account</li>
            <li>Card has expired or is invalid</li>
            <li>Bank declined the transaction</li>
            <li>Incorrect billing information</li>
            <li>Temporary technical issue with our payment processor</li>
          </ul>
        </div>

        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">What would you like to do?</h3>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={onRetry}
              className="flex items-center justify-center"
            >
              Try Payment Again
            </Button>
            <Button
              variant="outline"
              onClick={onChangeMethod}
              className="flex items-center justify-center"
            >
              Choose Different Payment Method
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-4">
          <p>
            If you continue to experience issues, please contact our customer
            support at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline"
            >
              support@example.com
            </a>{" "}
            or call us at (555) 123-4567.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
