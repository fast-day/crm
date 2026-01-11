import { useGetLocationsQuery } from "@/entities/location"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { LocationEmpty, LocationTable } from "@/widgets/location";
import { Link } from "@tanstack/react-router";

export const Locations = () => {
  const { data: locations, isLoading, isSuccess } = useGetLocationsQuery();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Локации</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={"/business/locations/create"}>
            <Button 
              size={"size_44"} 
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<AddIcon width={21} height={21}/>}
            >Добавить</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <>loading...</>}
      {!isLoading && isSuccess && locations.length ? (
        <LocationTable locations={locations} isLoading={isLoading} />
      ) : (
        !isLoading && <LocationEmpty />
      )}
    </>
  )
}
