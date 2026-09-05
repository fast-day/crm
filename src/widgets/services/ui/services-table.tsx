import { ServicesTableDesktop } from "./table/services-table-desktop";
import { ServicesTableMobile } from "./table/services-table-mobile";
import type { ServicesTableProps } from "./table/types/props.type";
import { useMediaQuery } from "react-responsive";

export const ServicesTable = ({ services, isFetching }: ServicesTableProps) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isTablet ?
        <ServicesTableMobile isFetching={isFetching} services={services} />
        :
        <ServicesTableDesktop isFetching={isFetching} services={services} />
      }
    </>
  )
}
