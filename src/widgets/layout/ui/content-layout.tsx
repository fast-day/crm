import type { PropsWithChildren } from "react"

export const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="container space-y-8">{children}</div>
    </div>
  )
}
