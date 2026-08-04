import type { PropsWithChildren } from "react"
import { useSelector } from "react-redux";
import { useAccount } from "@/entities/account";
import { MobileSidebar, Sidebar } from "@/widgets/sidebar";
import { useMediaQuery } from 'react-responsive';
import { BaseLayout } from "./base-layout";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { isCompany } = useSelector(useAccount);
  const isTablet = useMediaQuery({ query: `(max-width: 1100px)` })

  const sidebar = !isTablet && isCompany ? <Sidebar />
    : isTablet && isCompany ? <MobileSidebar /> : null;

  return (
    <BaseLayout sidebar={sidebar} mainClassName={!isTablet && isCompany ? "pl-59" : ""}>
      {children}
    </BaseLayout>
  )
}
