# Authentication

This document describes the authentication flow and configuration using better-auth.

## Overview

- **Provider**: [better-auth](https://www.better-auth.com/)
- **Method**: Email and password
- **Database**: MongoDB via better-auth's Mongoose adapter
- **Session**: Cookie-based with optional cache

## Configuration

### Server (`lib/auth/auth.ts`)

```typescript
auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  session: { cookieCache: { enabled: true, maxAge: 3600 } },
  emailAndPassword: { enabled: true },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await initializeUserBoard(user.id);  // Create default board
        },
      },
    },
  },
});
```

### Client (`lib/auth/auth-client.ts`)

```typescript
authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
```

### API Route (`app/api/auth/[...all]/route.ts`)

All auth requests are handled by the catch-all route:

```typescript
export const { GET, POST } = toNextJsHandler(auth);
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Base URL for auth client (e.g., `http://localhost:3000`) |

## Flow

### Sign Up

1. User submits form on `/sign-up`
2. `signUp.email()` from auth client
3. better-auth creates user in MongoDB
4. `user.create.after` hook runs → `initializeUserBoard()` creates default board
5. Redirect to `/dashboard`

### Sign In

1. User submits form on `/sign-in`
2. `signIn.email()` from auth client
3. Session cookie set
4. Redirect to `/dashboard`

### Session Check

- **Server**: `getSession()` uses `headers()` from Next.js
- **Client**: `useSession()` hook from auth client
- **Proxy**: Cookie check for `better-auth.session_token` (Edge-safe)

## Route Protection

The `proxy.ts` file (Next.js 16) protects routes:

- **Auth pages** (`/sign-in`, `/sign-up`): Redirect to `/dashboard` if signed in
- **Dashboard** (`/dashboard`): Redirect to `/sign-in` if not signed in

## Server-Side Auth

```typescript
const session = await getSession();
if (!session?.user) {
  redirect("/sign-in");
}
// session.user.id, session.user.email, session.user.name
```

## Client-Side Auth

```typescript
const { data: session } = useSession();
// session?.user
```
