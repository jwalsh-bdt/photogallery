import React, { useState } from "react";
import { CreditCard, BanknoteIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface PaymentMethodSelectorProps {
  onPaymentMethodSelected?: (method: "credit_card" | "wire_transfer") => void;
  selectedMethod?: "credit_card" | "wire_transfer";
}

const PaymentMethodSelector = ({
  onPaymentMethodSelected = () => {},
  selectedMethod = "credit_card",
}: PaymentMethodSelectorProps) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "credit_card" | "wire_transfer"
  >(selectedMethod);

  const handlePaymentMethodChange = (value: string) => {
    const method = value as "credit_card" | "wire_transfer";
    setPaymentMethod(method);
    onPaymentMethodSelected(method);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-2xl">Payment Method</CardTitle>
        <CardDescription>Select your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="space-y-4"
        >
          <div
            className={`flex items-start space-x-4 rounded-md border p-4 ${paymentMethod === "credit_card" ? "border-primary bg-secondary/20" : ""}`}
          >
            <RadioGroupItem
              value="credit_card"
              id="credit_card"
              className="mt-1"
            />
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="credit_card"
                className="flex cursor-pointer items-center gap-2 font-medium"
              >
                <CreditCard className="h-5 w-5" />
                Credit Card
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                Pay securely with your credit card via Stripe
              </p>
              {paymentMethod === "credit_card" && (
                <div className="mt-4 rounded-md border p-4 bg-background">
                  <p className="text-sm mb-2">
                    Stripe credit card form will be integrated here
                  </p>
                  <div className="grid gap-2">
                    <div className="h-10 rounded-md bg-muted/50"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-10 rounded-md bg-muted/50"></div>
                      <div className="h-10 rounded-md bg-muted/50"></div>
                    </div>
                    <div className="h-10 rounded-md bg-muted/50"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex items-start space-x-4 rounded-md border p-4 ${paymentMethod === "wire_transfer" ? "border-primary bg-secondary/20" : ""}`}
          >
            <RadioGroupItem
              value="wire_transfer"
              id="wire_transfer"
              className="mt-1"
            />
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="wire_transfer"
                className="flex cursor-pointer items-center gap-2 font-medium"
              >
                <BanknoteIcon className="h-5 w-5" />
                Wire Transfer
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                Pay via bank wire transfer
              </p>
              {paymentMethod === "wire_transfer" && (
                <div className="mt-4 rounded-md border p-4 bg-background">
                  <p className="text-sm font-medium mb-2">
                    Wire Transfer Instructions
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Bank Name:</span>{" "}
                      International Bank
                    </p>
                    <p>
                      <span className="font-medium">Account Name:</span>{" "}
                      Photography Store Inc.
                    </p>
                    <p>
                      <span className="font-medium">Account Number:</span>{" "}
                      XXXX-XXXX-XXXX-1234
                    </p>
                    <p>
                      <span className="font-medium">Routing Number:</span>{" "}
                      123456789
                    </p>
                    <p>
                      <span className="font-medium">SWIFT/BIC:</span>{" "}
                      INTLBANK123
                    </p>
                    <p className="mt-4 text-muted-foreground">
                      Please include your order number in the transfer
                      description. Your order will be processed after payment
                      confirmation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={() => (window.location.href = "/checkout?step=shipping")}
        >
          Continue to Shipping
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodSelector;
