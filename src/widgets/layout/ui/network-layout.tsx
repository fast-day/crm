import type { PropsWithChildren } from "react"

export const NetworkLayout = ({ children }: PropsWithChildren) => {

  return (
    <div className="flex flex-1 min-h-full relative">
      <main className="flex flex-col flex-1 items-center justify-center">

        {children}

      </main>
    </div>
  )
}
