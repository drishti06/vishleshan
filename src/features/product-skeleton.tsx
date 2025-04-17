import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-square animate-pulse bg-muted"></div>
          <CardContent className="p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted"></div>
            <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-muted"></div>
          </CardContent>
          <CardFooter className="p-4">
            <div className="h-10 w-full animate-pulse rounded bg-muted"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
