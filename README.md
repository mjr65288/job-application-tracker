# Job Application Tracker

A Kanban-style web application for tracking job applications. Users can sign up, create a default board, and manage applications across stages: **Wish List → Applied → Interviewing → Offer → Rejected**.

## Features

- **Authentication** — Email/password sign-up and sign-in with better-auth
- **Kanban Board** — Drag-and-drop job cards across columns
- **Job Management** — Create, edit, move, and delete job applications
- **Dark Mode** — Theme toggle (Light / Dark / System)
- **Mobile Responsive** — Optimized for all screen sizes
- **Toast Notifications** — Feedback for all CRUD operations

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16, React 19 |
| Database | MongoDB 7, Mongoose 9 |
| Auth | better-auth |
| UI | Tailwind CSS 4, Radix UI, shadcn/ui |
| Drag & Drop | @dnd-kit |

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB instance
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd job-application-tracker

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and auth URL
```

### Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=mongodb://localhost:27017/job-tracker
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for full environment setup.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/auth/           # better-auth API handler
│   ├── dashboard/          # Protected Kanban board
│   ├── sign-in/
│   ├── sign-up/
│   └── page.tsx            # Landing page
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives
│   └── ...
├── lib/
│   ├── actions/            # Server actions
│   ├── auth/               # Auth config (server + client)
│   ├── hooks/              # Client hooks
│   ├── models/             # Mongoose models
│   └── ...
├── proxy.ts                # Auth redirect middleware (Next.js 16)
└── scripts/                # Seed and utility scripts
```

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/ARCHITECTURE.md) | High-level architecture, patterns, and conventions |
| [Data Models](docs/DATA-MODELS.md) | Database schema and TypeScript types |
| [Authentication](docs/AUTHENTICATION.md) | Auth flow and better-auth setup |
| [Development](docs/DEVELOPMENT.md) | Setup, scripts, and development workflow |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run seed:jobs` | Seed sample job data (requires `.env.local`) |

## License

Private project.
