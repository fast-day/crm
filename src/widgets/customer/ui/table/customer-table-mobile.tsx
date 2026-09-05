import { ChevronRightIcon } from "@/shared/icons"
import { Button, TableMobile, TableMobileAction, TableMobileBody, TableMobileCell, TableMobileRow, TableNotFound } from "@/shared/ui"
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar } from "@/entities/user";
import type { CustomerTableProps } from "./types/props.type";

export const CustomerTableMobile = ({ customers, isFetching }: CustomerTableProps) => {
  const navigate = useNavigate();

  return (
    <TableMobile>
      <TableMobileBody>
        {isFetching && <LazyBlur />}
        {customers?.length ?
          customers.map((customer) => (
            <TableMobileRow key={customer.id} onClick={() => navigate({ to: `${customer.id}` })}>
              <TableMobileCell thead="Имя">
                <div className="flex items-center gap-2.5">
                  <Avatar size={"small"} avatar_url={customer.avatar} name={customer.full_name} id={customer.id} />
                  <div>
                    <p>{customer.full_name}</p>
                  </div>
                </div>
              </TableMobileCell>

              <TableMobileCell thead={"Номер телефона"}>
                <Link to={`tel:${customer.phone}`} onClick={(e) => e.stopPropagation()}>{customer.phone}</Link>
              </TableMobileCell>

              <TableMobileAction>
                <Button variant={"white"} size={"icon_32"} animation={"toggle_sm"} className={"rounded-10! rounded-tr-xl!"}>
                  <ChevronRightIcon width={17} height={17} />
                </Button>
              </TableMobileAction>
            </TableMobileRow>
          )) : (
            <TableMobileRow>
              <TableNotFound>Нет данных</TableNotFound>
            </TableMobileRow>
          )}
      
      </TableMobileBody>
    </TableMobile>
  )
}
