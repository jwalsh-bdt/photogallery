import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartSummary from "@/components/checkout/CartSummary";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import ShippingOptions from "@/components/checkout/ShippingOptions";
import ContactInformation from "@/components/checkout/ContactInformation";
import OrderSummary from "@/components/checkout/OrderSummary";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import PaymentError from "@/components/checkout/PaymentError";
import AccountCreationModal from "@/components/auth/AccountCreationModal";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<string>(() => {
    // Check URL for step parameter
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get("step");
    return stepParam &&
      ["cart", "payment", "shipping", "contact", "confirmation"].includes(
        stepParam,
      )
      ? stepParam
      : "cart";
  });
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [paymentError, setPaymentError] = useState<boolean>(false);

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Mountain Landscape Print",
      price: 89.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "2",
      name: "Ocean Sunset Canvas",
      price: 129.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
  ]);

  // Checkout steps configuration
  const steps = [
    { id: "cart", label: "Cart" },
    { id: "payment", label: "Payment" },
    { id: "shipping", label: "Shipping" },
    { id: "contact", label: "Contact" },
    { id: "confirmation", label: "Confirmation" },
  ];

  const handleStepClick = (stepId: string) => {
    // Only allow clicking on completed steps or the current step
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const currentIndex = steps.findIndex((step) => step.id === currentStep);

    if (stepIndex <= currentIndex) {
      setCurrentStep(stepId);
      // Update URL with the new step
      window.history.pushState({}, "", `/checkout?step=${stepId}`);
    }
  };

  const handleNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1].id;
      setCurrentStep(nextStep);
      // Update URL with the new step
      window.history.pushState({}, "", `/checkout?step=${nextStep}`);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1].id;
      setCurrentStep(prevStep);
      // Update URL with the new step
      window.history.pushState({}, "", `/checkout?step=${prevStep}`);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handlePaymentComplete = () => {
    // In a real app, this would process payment and then move to confirmation
    // For demo purposes, we'll show the account creation modal if user is not logged in
    if (!user) {
      setShowAccountModal(true);
    } else {
      // If user is already logged in, proceed to confirmation
      setCurrentStep("confirmation");
    }
  };

  const handleAccountCreated = () => {
    // After account is created, proceed to confirmation
    setCurrentStep("confirmation");
  };

  const handleContinueAsGuest = () => {
    // Close modal and proceed to confirmation
    setShowAccountModal(false);
    setCurrentStep("confirmation");
  };

  const handleSimulatePaymentError = () => {
    setPaymentError(true);
  };

  const handleRetryPayment = () => {
    setPaymentError(false);
    // In a real app, this would re-attempt the payment
  };

  const renderStepContent = () => {
    if (paymentError) {
      return (
        <PaymentError
          onRetry={handleRetryPayment}
          onChangeMethod={() => setCurrentStep("payment")}
        />
      );
    }

    switch (currentStep) {
      case "cart":
        return (
          <CartSummary
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        );
      case "payment":
        return (
          <div className="space-y-6">
            <PaymentMethodSelector />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back to Cart
              </Button>
              <div className="space-x-4">
                <Button
                  variant="outline"
                  onClick={handleSimulatePaymentError}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Simulate Error
                </Button>
                <Button onClick={handleNextStep}>Continue to Shipping</Button>
              </div>
            </div>
          </div>
        );
      case "shipping":
        return (
          <div className="space-y-6">
            <ShippingOptions />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back to Payment
              </Button>
              <Button onClick={handleNextStep}>Continue to Contact</Button>
            </div>
          </div>
        );
      case "contact":
        return (
          <ContactInformation
            onBack={handlePreviousStep}
            onSubmit={() => handlePaymentComplete()}
          />
        );
      case "confirmation":
        return <OrderConfirmation />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutStepper
        steps={steps}
        currentStepId={currentStep}
        onStepClick={handleStepClick}
      />

      <div className="container mx-auto py-8 px-4">{renderStepContent()}</div>

      {/* Account Creation Modal */}
      <AccountCreationModal
        open={showAccountModal}
        onOpenChange={setShowAccountModal}
        onAccountCreated={handleAccountCreated}
        onContinueAsGuest={handleContinueAsGuest}
      />
    </div>
  );
};

export default CheckoutPage;
