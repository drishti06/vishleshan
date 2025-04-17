export function ProductDetailsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="aspect-square animate-pulse rounded-lg bg-muted"></div>
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 w-16 animate-pulse rounded-md bg-muted"></div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted"></div>
          <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-muted"></div>
        </div>
        <div>
          <div className="h-6 w-1/4 animate-pulse rounded bg-muted"></div>
          <div className="mt-1 h-4 w-1/5 animate-pulse rounded bg-muted"></div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="mb-2 h-5 w-16 animate-pulse rounded bg-muted"></div>
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 h-5 w-16 animate-pulse rounded bg-muted"></div>
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-12 animate-pulse rounded-md bg-muted"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 h-5 w-20 animate-pulse rounded bg-muted"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
              <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
              <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="h-10 flex-1 animate-pulse rounded bg-muted"></div>
            <div className="h-10 w-1/3 animate-pulse rounded bg-muted"></div>
            <div className="h-10 w-10 animate-pulse rounded bg-muted"></div>
          </div>
        </div>
        <div>
          <div className="h-10 w-full animate-pulse rounded bg-muted"></div>
          <div className="mt-4 h-20 w-full animate-pulse rounded bg-muted"></div>
        </div>
      </div>
    </div>
  )
}
