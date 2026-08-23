import { useGetDetailServiceQuery } from "@/entities/services"
import { Can } from "@/features/auth"
import { PencilEditIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { ServiceDetailLazy, ServiceDetails, ServiceNotFound } from "@/widgets/services"
import { Link } from "@tanstack/react-router"

export interface IServiceDetailProps {
  service_id: string;
}

export const ServicesDetail = ({ service_id }: IServiceDetailProps) => {
  const { data, isLoading, isError } = useGetDetailServiceQuery({ service_id });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Услуга {data?.name && `- ${data.name}`}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />

          <Can permission={"service:update"}>
            <Link to={`/business/services/${data?.id}/edit`}>
              <Button 
                size={"size_44"} 
                animation={"toggle"}
                className={"text-sm font-bold"}
                iconLeft={<PencilEditIcon width={21} height={21}/>}
                disabled={isLoading || isError}
              >Редактировать</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <ServiceDetailLazy />}
      {isError && <ServiceNotFound />}
      {data && <ServiceDetails service={data} />}
    </>
  )
}
