import { AddFillIcon } from "@/shared/icons"
import { Button, Card } from "@/shared/ui"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import type { ILocationServices } from "../model/types/location.type";

interface LocationServicesProps {
  services: ILocationServices[];
}

export const LocationServices = ({ services }: LocationServicesProps) => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <CardTitle className="mb-0">Услуги</CardTitle>
          <Button variant={"dashed"} size={"iconSm"} animation={"toggle_sm"} className={"p-0 rounded-12!"}>
            <AddFillIcon width={18} height={18} />
          </Button>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        {services.length > 0 ?
          services.map((service, idx) => <div key={idx}>{service.name}</div>) : 
          <CardDescription>—</CardDescription>
        }
      </CardContent>
    </Card>
  )
}
