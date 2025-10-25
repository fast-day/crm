import type { PropsWithChildren } from "react"

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col">
      <header></header>

      <main className="flex flex-col flex-1">
        {children}
      </main>

      <footer></footer>
    </div>
  )
}
