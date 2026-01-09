import { useGetLocationsQuery } from "@/entities/location"
import { Avatar } from "@/entities/user";
import { AddIcon, ArrowsDownUpIcon, ChevronRightIcon, WorldPauseIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Table, TableBody, TableCell, TableCellActions, TableHead, TableHeader, TableRow } from "@/shared/ui"

export const Locations = () => {
  const { data: locations } = useGetLocationsQuery();

  return (
    <div className="space-y-8">

      <PageHeader>
        <PageHeaderTitle>Локации</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Button 
            size={"size_44"} 
            animation={"toggle"}
            className={"text-sm font-bold"}
            iconLeft={<AddIcon width={21} height={21}/>}
          >Добавить</Button>
        </PageHeaderActions>
      </PageHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>
              <Button 
                variant={"ghost"} 
                size={"none"} 
                animation={"toggle_sm"}
                iconRight={<ArrowsDownUpIcon width={18} height={18}/>}
              >Номер телефона</Button>
            </TableHead>
            <TableHead>Описание</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {locations && locations.map((loc, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar size={"large"} avatar_url={loc.avatar} name={loc.name.slice(0, 1)} id={loc.id} />
                <div>
                  <p>{loc.name}</p>
                  <p className="text-11 leading-3 opacity-50 mt-px font-normal">{loc.address.full_address.replace(/\//g, " ")}</p>
                </div>
              </TableCell>
              <TableCell>{loc.phone}</TableCell>
              <TableCell className="text-xss leading-3.4 opacity-90">
                type HoverDropdownItemLinkProps = React ComponentProps typeof Link & 
                  className?: string;
                
              </TableCell>
              <TableCellActions>
                <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                  <WorldPauseIcon width={16} height={16} />
                </Button>
                <Button variant={"white"} size={"icon_40"} animation={"toggle_sm"}>
                  <ChevronRightIcon width={17} height={17} />
                </Button>
              </TableCellActions>
            </TableRow>
          ))}
        </TableBody>

      </Table>

    </div>
  )
}
