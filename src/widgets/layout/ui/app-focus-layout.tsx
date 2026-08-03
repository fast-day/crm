import type { PropsWithChildren } from "react"
import { useMediaQuery } from "react-responsive";
import { BaseLayout } from "./base-layout";
import { MobileSidebar } from "@/widgets/sidebar";

export const AppFocusLayout = ({ children }: PropsWithChildren) => {
  const isTablet = useMediaQuery({ query: `(max-width: 1100px)` })

  return (
    <BaseLayout sidebar={isTablet ? <MobileSidebar /> : null}>
      {children}
    </BaseLayout>
  )
}
