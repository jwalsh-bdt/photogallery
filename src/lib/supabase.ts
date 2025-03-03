import { createClient } from "@supabase/supabase-js";

// Mock Supabase client for development
const mockSupabase = {
  auth: {
    signUp: async () => ({
      data: {
        user: {
          id: "1",
          email: "user@example.com",
          user_metadata: { name: "Test User" },
        },
      },
      error: null,
    }),
    signInWithPassword: async () => ({
      data: {
        user: {
          id: "1",
          email: "user@example.com",
          user_metadata: { name: "Test User" },
        },
      },
      error: null,
    }),
    signInWithOAuth: async () => ({ data: {}, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({
      data: {
        user: {
          id: "1",
          email: "user@example.com",
          user_metadata: { name: "Test User" },
        },
      },
      error: null,
    }),
    getSession: async () => ({
      data: { session: { user: { id: "1", email: "user@example.com" } } },
      error: null,
    }),
    resetPasswordForEmail: async () => ({ error: null }),
    updateUser: async () => ({
      data: {
        user: {
          id: "1",
          email: "user@example.com",
          user_metadata: { name: "Updated User" },
        },
      },
      error: null,
    }),
  },
};

// Use real Supabase client if environment variables are available, otherwise use mock
let supabase;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Supabase credentials not found. Using mock implementation.");
  supabase = mockSupabase as any;
}

export { supabase };
