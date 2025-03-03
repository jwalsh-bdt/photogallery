import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthForm from "./AuthForm";

interface AccountCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccountCreated?: () => void;
  onContinueAsGuest?: () => void;
}

const AccountCreationModal = ({
  open,
  onOpenChange,
  onAccountCreated = () => {},
  onContinueAsGuest = () => {},
}: AccountCreationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Here you would implement your login logic
      console.log("Login with:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success
      onAccountCreated();
      onOpenChange(false);
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Here you would implement your registration logic
      console.log("Register with:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success
      onAccountCreated();
      onOpenChange(false);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github" | "twitter",
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Here you would implement your social login logic
      console.log(`Login with ${provider}`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success
      onAccountCreated();
      onOpenChange(false);
    } catch (err) {
      setError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Create an Account</DialogTitle>
          <DialogDescription className="text-center">
            Create an account to track your orders and manage your profile
          </DialogDescription>
        </DialogHeader>

        <AuthForm
          defaultTab="register"
          onLogin={handleLogin}
          onRegister={handleRegister}
          onSocialLogin={handleSocialLogin}
          isLoading={isLoading}
          error={error}
        />

        <div className="mt-4 text-center">
          <button
            onClick={onContinueAsGuest}
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Continue as guest
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountCreationModal;
