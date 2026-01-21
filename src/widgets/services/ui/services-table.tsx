import type { IServices } from "@/entities/services";
import { Avatar } from "@/entities/user";
import { Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator } from "@/shared/ui"
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface ServicesTableProps {
  services?: IServices[];
}

export const ServicesTable = ({ services }: ServicesTableProps) => {
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Длительность</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {services?.length ? 
            services.map((service, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => navigate({ to: `/business/services/${service.id}` })}>
                  <TableCell>
                    <Avatar size={"large"} avatar_url={""} name={""} id={service.id} />
                    <div>
                      <p>{service.name}</p>
                      <p className="text-11 leading-3 opacity-50 mt-px font-normal">{service.category.length ? service.category : "Без категории"}</p>
                    </div>
                  </TableCell>
                  <TableCell>{service.price} ₽</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCellActions>
                    <Link to={`${service.id}`}>
                      <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                        <ChevronRightIcon width={17} height={17} />
                      </Button>
                    </Link>
                  </TableCellActions>

                </TableRow>
                {index !== services.length - 1 && <TableSeparator />}
              </React.Fragment>
            )) : (
              <TableRow>
                <TableNotFound>Нет данных</TableNotFound>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}
