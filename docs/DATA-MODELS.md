# Data Models

This document describes the database schema and TypeScript types used in the application.

## Entity Relationship

```
User (better-auth)
  └── Board (1:1 per user, "Job Hunt")
        └── Column[] (ordered)
              └── JobApplication[] (ordered)
```

## Mongoose Models

### Board

**File**: `lib/models/board.ts`

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Board name (default: "Job Hunt") |
| `userId` | String | Owner (better-auth user ID) |
| `columns` | ObjectId[] | References to Column documents |
| `createdAt` | Date | Auto |
| `updatedAt` | Date | Auto |

**Indexes**: `userId`

---

### Column

**File**: `lib/models/column.ts`

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Column name (e.g., "Applied") |
| `boardId` | ObjectId | Parent board |
| `order` | Number | Display order |
| `jobApplications` | ObjectId[] | References to JobApplication |
| `createdAt` | Date | Auto |
| `updatedAt` | Date | Auto |

**Indexes**: `boardId`

**Default columns** (from `init-user-board.ts`):

1. Wish List (order: 0)
2. Applied (order: 1)
3. Interviewing (order: 2)
4. Offer (order: 3)
5. Rejected (order: 4)

---

### JobApplication

**File**: `lib/models/job-application.ts`

| Field | Type | Description |
|-------|------|-------------|
| `company` | String | Company name |
| `position` | String | Job title |
| `location` | String | Optional |
| `status` | String | Default: "applied" |
| `columnId` | ObjectId | Current column |
| `boardId` | ObjectId | Board |
| `userId` | String | Owner |
| `order` | Number | Position within column |
| `notes` | String | Optional |
| `salary` | String | Optional |
| `jobUrl` | String | Optional |
| `appliedDate` | Date | Set on create |
| `tags` | String[] | Optional |
| `description` | String | Optional |
| `createdAt` | Date | Auto |
| `updatedAt` | Date | Auto |

**Indexes**: `columnId`, `boardId`, `userId`

## TypeScript Types

**File**: `lib/models/models.types.ts`

Used for UI and server action responses (serialized from Mongoose):

```typescript
interface JobApplication {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  order: number;
  columnId?: string;
  tags?: string[];
  description?: string;
  appliedDate?: string;
}

interface Column {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplication[];
}

interface Board {
  _id: string;
  name: string;
  columns: Column[];
}
```

## Ordering

Job applications use an `order` field with gaps (multiples of 100) to allow efficient reordering without updating all documents. When moving jobs, the server adjusts `order` values as needed.
