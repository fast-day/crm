import type { PropsWithChildren } from "react"

export const PageTableWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-8 space-y-6">{children}</div>
  )
}
