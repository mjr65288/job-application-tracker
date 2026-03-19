# Architecture

This document describes the high-level architecture, patterns, and conventions used in the Job Application Tracker.

## Overview

The application follows a **Next.js App Router** architecture with:

- **Server Components** for data fetching and initial render
- **Server Actions** for mutations (create, update, delete)
- **Client Components** for interactivity (forms, drag-and-drop, theme)
- **Proxy** (Next.js 16) for route protection and redirects

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | Next.js 16 | App Router, RSC, Server Actions |
| UI | React 19 | Components |
| Database | MongoDB 7 + Mongoose 9 | Persistence |
| Auth | better-auth | Email/password, sessions |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| Components | Radix UI, shadcn/ui | Accessible primitives |
| Drag & Drop | @dnd-kit | Kanban board interactions |
| Toasts | Sonner | User feedback |

## Directory Structure

```
app/
├── api/auth/[...all]/route.ts   # better-auth catch-all handler
├── dashboard/page.tsx           # Protected Kanban board (server)
├── sign-in/page.tsx             # Sign-in form (client)
├── sign-up/page.tsx             # Sign-up form (client)
├── page.tsx                     # Landing page
├── layout.tsx                   # Root layout, ThemeProvider, Toaster
└── globals.css                  # Tailwind, theme variables

components/
├── ui/                          # shadcn primitives (Button, Card, Dialog, etc.)
├── kanban-board.tsx             # Main board with drag-and-drop
├── job-application-card.tsx     # Job card with edit/delete/move
├── create-job-dialog.tsx        # Add job form
├── navbar.tsx                   # Global nav + auth menu
├── theme-provider.tsx           # Dark/light theme context
└── theme-toggle.tsx             # Theme switcher

lib/
├── actions/job-applications.ts  # Server actions (CRUD)
├── auth/auth.ts                 # better-auth config (server)
├── auth/auth-client.ts         # Client auth helpers
├── db.ts                        # Mongoose connection (cached)
├── hooks/useBoards.ts           # Board state + optimistic moveJob
├── init-user-board.ts          # Creates default board on signup
├── models/                      # Mongoose schemas
└── utils.ts                     # cn() for class merging

proxy.ts                         # Route protection (Next.js 16)
```

## Key Patterns

### Server vs Client

- **`"use server"`** — Server actions in `lib/actions/`
- **`"use client"`** — Interactive components (forms, drag, theme)
- **`"use cache"`** — Cached data fetching in dashboard `getBoard()`

### Data Flow

1. **Dashboard load**: Server fetches board with `getBoard()` (cached), passes to `KanbanBoard`
2. **Mutations**: Client calls server action → `revalidatePath("/dashboard")` → UI updates
3. **Optimistic updates**: `useBoard` hook updates local state before `moveJob` completes

### State Management

- **Server**: `getSession()` for auth; `revalidatePath()` after mutations
- **Client**: `useState` for forms/dialogs; `useBoard` for board state
- **Theme**: `ThemeProvider` context + `localStorage` persistence

### Styling

- **Tailwind CSS 4** with `@theme` and CSS variables in `globals.css`
- **Theme variables**: `--background`, `--foreground`, `--primary`, etc.
- **Dark mode**: `@custom-variant dark`; `.dark` class on `<html>`
- **Path alias**: `@/components`, `@/lib`

## Route Protection

The `proxy.ts` file (Next.js 16 convention) runs before requests:

- **Signed-in users** visiting `/sign-in` or `/sign-up` → redirect to `/dashboard`
- **Unauthenticated users** visiting `/dashboard` → redirect to `/sign-in`
- Uses cookie check (`better-auth.session_token`) for Edge compatibility

## Conventions

1. **Path aliases**: Use `@/` for imports from project root
2. **Types**: Shared types in `lib/models/models.types.ts`
3. **Ownership**: All mutations verify `session.user.id` matches resource owner
4. **Toasts**: Use `toast.success()` / `toast.error()` for user feedback
