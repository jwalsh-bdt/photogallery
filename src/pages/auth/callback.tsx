import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the auth code from the URL
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        // If we have a session, redirect to the intended page or home
        if (data.session) {
          // Get the redirect path from localStorage or default to home
          const redirectTo = localStorage.getItem("authRedirectTo") || "/";
          localStorage.removeItem("authRedirectTo"); // Clean up
          navigate(redirectTo);
        } else {
          // No session found, redirect to login
          navigate("/login");
        }
      } catch (err: any) {
        console.error("Error during auth callback:", err);
        setError(err.message || "Authentication failed");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold">Completing authentication...</h1>
        <div className="mt-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;
