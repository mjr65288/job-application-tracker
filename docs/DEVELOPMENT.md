# Development Guide

This document covers setup, environment variables, scripts, and development workflow.

## Prerequisites

- **Node.js** 18 or later
- **MongoDB** 7.x (local or Atlas)
- **npm** or **pnpm**

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local` in the project root:

```env
# Required
MONGODB_URI=mongodb://localhost:27017/job-tracker
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# For production, use your deployed URL:
# NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.com
```

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Yes | Base URL for auth (must match app URL) |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed:jobs` | Seed sample jobs for a user |

## Seeding Data

The seed script populates a board with sample job applications.

**Important**: Update `USER_ID` in `scripts/seed.ts` to a valid user ID from your database, or pass it via environment:

```bash
# Option 1: Edit scripts/seed.ts and set USER_ID
# Option 2: Use env (if script supports it)
SEED_USER_ID=your-user-id npm run seed:jobs
```

The script will:

1. Connect to MongoDB
2. Find or create the user's "Job Hunt" board
3. Clear existing jobs for that user
4. Create 15 sample jobs across columns

## Next.js 16 Notes

This project uses **Next.js 16**, which has breaking changes from earlier versions:

- **Proxy** instead of Middleware: See `proxy.ts` (not `middleware.ts`)
- **Docs**: Check `node_modules/next/dist/docs/` for current APIs
- **AGENTS.md**: Contains reminders for AI assistants

## Database Connection

MongoDB connection is cached globally to avoid creating multiple connections during development (hot reload). See `lib/db.ts`.

## Adding New Features

1. **New page**: Add under `app/`
2. **Server action**: Add to `lib/actions/` with `"use server"`
3. **Client hook**: Add to `lib/hooks/`
4. **UI component**: Add to `components/` or `components/ui/`
5. **Model**: Add to `lib/models/` and export from `index.ts`

## Troubleshooting

### "MONGODB_URI is not defined"

Ensure `.env.local` exists and contains `MONGODB_URI`. Restart the dev server after changing env vars.

### Auth redirects not working

Verify `NEXT_PUBLIC_BETTER_AUTH_URL` matches the URL you're accessing (e.g., `http://localhost:3000`).

### Board not loading

Check that the user has a board. New users get one via the `user.create.after` hook. For existing users without a board, run `initializeUserBoard(userId)` manually or sign up again.
