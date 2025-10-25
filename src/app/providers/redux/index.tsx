import type { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { store } from "./config"

export const ReduxProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store} children={children} />
  )
}
