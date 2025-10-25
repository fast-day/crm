import type { PropsWithChildren } from "react"
import { ReduxProvider } from "./redux"

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}
