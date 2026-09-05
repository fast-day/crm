import type { PropsWithChildren } from "react"

export const PageDetailWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-8">
      <div className="grid 1100:max-w-full max-w-180 mx-auto grid-cols-1 1100:grid-cols-5 1100:gap-x-8 1100:gap-y-0 gap-y-8 w-full">
        {children}
      </div>
    </div>
  )
}
