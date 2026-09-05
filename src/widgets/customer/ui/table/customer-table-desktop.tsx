import React from "react";
import { Avatar } from "@/entities/user"
import { ChevronRightIcon } from "@/shared/icons"
import { Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { LazyBlur } from "@/widgets/loading";
import { Link, useNavigate } from "@tanstack/react-router";
import type { CustomerTableProps } from "./types/props.type";

export const CustomerTableDesktop = ({ customers, isFetching }: CustomerTableProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="relative">
          {isFetching && <LazyBlur />}
          {customers?.length ? 
            customers.map((customer, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `${customer.id}` })}>
                  <TableCell>
                    <Avatar size={"large"} avatar_url={customer.avatar} name={customer.full_name} id={customer.id} />
                    <div>
                      <p>{customer.full_name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link to={`tel:${customer.phone}`} onClick={(e) => e.stopPropagation()}>{customer.phone}</Link>
                  </TableCell>
                  <TableCellActions>
                    <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                      <ChevronRightIcon width={17} height={17} />
                    </Button>
                  </TableCellActions>
                </TableRow>
                {index !== customers.length - 1 && <TableSeparator />}
              </React.Fragment>
            )) : (
              <TableRow>
                <TableNotFound>Нет данных</TableNotFound>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </>
  )
}
