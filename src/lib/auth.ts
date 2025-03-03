import { supabase } from "./supabase";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  name: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

// Sign up with email and password
export const signUp = async ({
  email,
  password,
  name,
}: UserRegistration): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user returned from sign up");

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: data.user.user_metadata?.name,
      avatar_url: data.user.user_metadata?.avatar_url,
    };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async ({
  email,
  password,
}: UserCredentials): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user returned from sign in");

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: data.user.user_metadata?.name,
      avatar_url: data.user.user_metadata?.avatar_url,
    };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign in with social provider
export const signInWithSocial = async (
  provider: "google" | "github" | "twitter",
) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error signing in with ${provider}:`, error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!data.user) return null;

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: data.user.user_metadata?.name,
      avatar_url: data.user.user_metadata?.avatar_url,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profile: Partial<User>) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: profile,
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user returned from update");

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: data.user.user_metadata?.name,
      avatar_url: data.user.user_metadata?.avatar_url,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
