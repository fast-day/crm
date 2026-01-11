import type { ILocationResponse } from "@/entities/location"
import { Avatar } from "@/entities/user"
import { ChevronRightIcon, WorldPauseIcon } from "@/shared/icons"
import { Button, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableNotFound, TableRow, TableSeparator, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui"
import React from "react";

interface LocationTableProps {
  locations?: ILocationResponse[];
  isLoading: boolean;
}

export const LocationTable = ({ locations }: LocationTableProps) => {
  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {locations?.length ? 
            locations.map((loc, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <Avatar size={"large"} avatar_url={loc.avatar} name={loc.name.slice(0, 1)} id={loc.id} />
                    <div>
                      <p>{loc.name}</p>
                      <p className="text-11 leading-3 opacity-50 mt-px font-normal">{loc.address.full_address.replace(/\//g, ", ")}</p>
                    </div>
                  </TableCell>
                  <TableCell>{loc.phone}</TableCell>
                  <TableCell className="text-xss leading-3.4 opacity-90">
                    {loc.description}
                  </TableCell>
                  <TableCellActions>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                          <WorldPauseIcon width={16} height={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Приостановить</TooltipContent>
                    </Tooltip>
                    <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                      <ChevronRightIcon width={17} height={17} />
                    </Button>
                  </TableCellActions>
                </TableRow>
                {index !== locations.length - 1 && <TableSeparator />}
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
