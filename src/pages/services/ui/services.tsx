import { accountSelector } from "@/entities/account"
import { useGetServicesQuery, type IServiceQuery } from "@/entities/services"
import { Can } from "@/features/auth"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui"
import { PageTableWrapper, RequestError } from "@/widgets/layout"
import { TableLoading } from "@/widgets/loading"
import { ServicesEmpty, ServiceSort, ServicesTable } from "@/widgets/services"
import { skipToken } from "@reduxjs/toolkit/query"
import { Link } from "@tanstack/react-router"
import { useSelector } from "react-redux"

interface ServiceProps {
  query: IServiceQuery & PaginationQuery;
}

export const Services = ({ query }: ServiceProps) => {
  const { account } = useSelector(accountSelector);
  const { data, isLoading, isError, isSuccess } = useGetServicesQuery(
    account?.has_services ? { ...query } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const content = !account?.has_services ? (
    <ServicesEmpty />
  ) : isLoading ? (
    <TableLoading rows={4} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <PageTableWrapper>
      <ServiceSort {...query} />

      <ServicesTable services={data.data} />

      {data.meta.total_pages > 1 && <Pagination {...data.meta} />}
    </PageTableWrapper>
  ) : (
    <ServicesEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Услуги</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"service:create"}>
            <Link to={"/business/services/create"}>
              <Button 
                size={"size_44"} 
                animation={"toggle"}
                className={"text-sm font-bold 1100:w-fit w-11 1100:px-6 px-0"}
                classNameChild={"1100:block hidden"}
                iconLeft={<AddIcon width={21} height={21}/>}
              >Добавить</Button>
            </Link>
          </Can>
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}
