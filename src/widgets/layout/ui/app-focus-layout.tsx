import type { PropsWithChildren } from "react"
import { BaseLayout } from "./base-layout";

export const AppFocusLayout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  )
}
