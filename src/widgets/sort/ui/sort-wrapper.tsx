import { Card, CardContent } from "@/shared/ui"
import type { PropsWithChildren } from "react"

export const SortWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Card className="max-w-[calc(100vw-40px)] overflow-y-hidden">
      <CardContent className="p-2 flex gap-2 overflow-y-auto scrollbar-hidden">
        {children}
      </CardContent>
    </Card>
  )
}
