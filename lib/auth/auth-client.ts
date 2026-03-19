import { createAuthClient } from "better-auth/react";

// Use current origin on client to avoid CORS (preview vs production URLs on Vercel)
const getBaseUrl = () =>
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
});

export const { signIn, signUp, signOut, useSession } = authClient;
