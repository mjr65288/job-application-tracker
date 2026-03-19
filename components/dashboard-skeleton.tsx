export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex gap-3 sm:gap-4 overflow-hidden pb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0 rounded-xl border bg-card shadow-sm overflow-hidden"
            >
              <div className="h-14 bg-muted animate-pulse" />
              <div className="space-y-3 p-4">
                <div className="h-20 rounded-lg bg-muted animate-pulse" />
                <div className="h-20 rounded-lg bg-muted animate-pulse" />
                <div className="h-20 rounded-lg bg-muted animate-pulse" />
                <div className="h-12 rounded-lg border-2 border-dashed border-muted-foreground/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
