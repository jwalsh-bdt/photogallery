import React from "react";
import { Check, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckoutStep {
  id: string;
  label: string;
  completed?: boolean;
  current?: boolean;
}

export interface CheckoutStepperProps {
  steps?: CheckoutStep[];
  currentStepId?: string;
  onStepClick?: (stepId: string) => void;
}

const CheckoutStepper = ({
  steps = [
    { id: "cart", label: "Cart Summary", completed: true },
    { id: "payment", label: "Payment Method", current: true },
    { id: "shipping", label: "Shipping Options" },
    { id: "contact", label: "Contact Information" },
    { id: "confirmation", label: "Order Confirmation" },
  ],
  currentStepId = "payment",
  onStepClick,
}: CheckoutStepperProps) => {
  // If currentStepId is provided, update the steps to reflect the current step
  const updatedSteps = React.useMemo(() => {
    if (!currentStepId) return steps;

    let foundCurrent = false;
    return steps.map((step) => {
      if (step.id === currentStepId) {
        foundCurrent = true;
        return { ...step, current: true, completed: false };
      }
      return {
        ...step,
        current: false,
        completed: !foundCurrent,
      };
    });
  }, [steps, currentStepId]);

  return (
    <div className="w-full bg-background border-b border-border shadow-sm">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {updatedSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onStepClick?.(step.id)}
                  disabled={!step.completed && !step.current}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    step.completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : step.current
                        ? "border-primary bg-background text-primary"
                        : "border-muted-foreground bg-background text-muted-foreground",
                  )}
                >
                  {step.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                  {step.current && (
                    <span className="absolute -right-1 -top-1">
                      <CircleDot className="h-4 w-4 text-primary" />
                    </span>
                  )}
                </button>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    step.current
                      ? "text-primary"
                      : step.completed
                        ? "text-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < updatedSteps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2",
                    updatedSteps[index + 1].completed ||
                      updatedSteps[index + 1].current
                      ? "bg-primary"
                      : "bg-muted",
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;
