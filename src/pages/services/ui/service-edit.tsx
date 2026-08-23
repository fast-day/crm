import { useGetDetailServiceQuery } from "@/entities/services";
import { PageHeader, PageHeaderTitle, PageHeaderActions, PageHeaderBackAction } from "@/shared/ui";
import { ServicesForm } from "./components/services-form";
import { ServiceFormLazy, ServiceNotFound } from "@/widgets/services";
import { useEditService } from "../model/hooks/service-update.hook";

interface IServiceEditProps {
  service_id: string;
}

export const ServiceEdit = ({ service_id }: IServiceEditProps) => {
  const { data, isLoading: isLoading, isError } = useGetDetailServiceQuery({ service_id });
  const { onSubmit, isLoading: isEdit } = useEditService(service_id);
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Редактировать услугу {data?.name && `- ${data.name}`}</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <ServiceFormLazy />}
      {isError && <ServiceNotFound />}
      {data && <ServicesForm onSubmit={onSubmit} isLoading={isEdit} data={data} />}
    </>
  )
}
