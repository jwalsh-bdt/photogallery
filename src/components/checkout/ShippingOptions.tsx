import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { PackageIcon, TruckIcon, ShieldIcon } from "lucide-react";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

interface PackingOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface InsuranceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  coverage: string;
}

interface ShippingOptionsProps {
  selectedShipping?: string;
  selectedPacking?: string;
  selectedInsurance?: string;
  onShippingChange?: (id: string) => void;
  onPackingChange?: (id: string) => void;
  onInsuranceChange?: (id: string) => void;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  selectedShipping = "standard",
  selectedPacking = "standard",
  selectedInsurance = "basic",
  onShippingChange = () => {},
  onPackingChange = () => {},
  onInsuranceChange = () => {},
}) => {
  // Mock data for shipping options
  const shippingOptions: ShippingOption[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "Delivery in 5-7 business days",
      price: 9.99,
      estimatedDelivery: "5-7 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "Delivery in 2-3 business days",
      price: 19.99,
      estimatedDelivery: "2-3 business days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Delivery by next business day",
      price: 29.99,
      estimatedDelivery: "Next business day",
    },
  ];

  // Mock data for packing options
  const packingOptions: PackingOption[] = [
    {
      id: "standard",
      name: "Standard Packing",
      description: "Basic protective packaging",
      price: 0,
    },
    {
      id: "premium",
      name: "Premium Packing",
      description: "Extra protection with premium materials",
      price: 5.99,
    },
    {
      id: "gift",
      name: "Gift Wrapping",
      description: "Elegant gift wrapping with a personalized note",
      price: 9.99,
    },
  ];

  // Mock data for insurance options
  const insuranceOptions: InsuranceOption[] = [
    {
      id: "none",
      name: "No Insurance",
      description: "No additional coverage",
      price: 0,
      coverage: "$0",
    },
    {
      id: "basic",
      name: "Basic Insurance",
      description: "Coverage up to $100",
      price: 4.99,
      coverage: "$100",
    },
    {
      id: "premium",
      name: "Premium Insurance",
      description: "Coverage up to $500",
      price: 12.99,
      coverage: "$500",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Shipping & Delivery Options</h2>

      {/* Packing Options */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5" />
            <span>Packing Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedPacking}
            onValueChange={onPackingChange}
            className="space-y-4"
          >
            {packingOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-3 p-3 rounded-md border hover:bg-gray-50"
              >
                <RadioGroupItem value={option.id} id={`packing-${option.id}`} />
                <div className="flex-1">
                  <Label
                    htmlFor={`packing-${option.id}`}
                    className="font-medium"
                  >
                    {option.name}{" "}
                    {option.price > 0 && `(+$${option.price.toFixed(2)})`}
                  </Label>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Shipping Options */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TruckIcon className="h-5 w-5" />
            <span>Shipping Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedShipping}
            onValueChange={onShippingChange}
            className="space-y-4"
          >
            {shippingOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-3 p-3 rounded-md border hover:bg-gray-50"
              >
                <RadioGroupItem
                  value={option.id}
                  id={`shipping-${option.id}`}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label
                      htmlFor={`shipping-${option.id}`}
                      className="font-medium"
                    >
                      {option.name}
                    </Label>
                    <span className="font-medium">
                      ${option.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{option.description}</p>
                  <p className="text-sm text-gray-500">
                    Estimated delivery: {option.estimatedDelivery}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Insurance Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldIcon className="h-5 w-5" />
            <span>Insurance Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedInsurance}
            onValueChange={onInsuranceChange}
            className="space-y-4"
          >
            {insuranceOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-3 p-3 rounded-md border hover:bg-gray-50"
              >
                <RadioGroupItem
                  value={option.id}
                  id={`insurance-${option.id}`}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label
                      htmlFor={`insurance-${option.id}`}
                      className="font-medium"
                    >
                      {option.name}
                    </Label>
                    <span className="font-medium">
                      {option.price > 0
                        ? `$${option.price.toFixed(2)}`
                        : "Free"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{option.description}</p>
                  {option.id !== "none" && (
                    <p className="text-sm text-gray-500">
                      Coverage up to: {option.coverage}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingOptions;
