import { accountSelector } from "@/entities/account";
import { useGetCustomersQuery, type ICustomerQuery } from "@/entities/customers";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle, Pagination } from "@/shared/ui";
import { CustomerEmpty, CustomerSort, CustomerTable } from "@/widgets/customer";
import { PageTableWrapper, RequestError } from "@/widgets/layout";
import { TableLoading } from "@/widgets/loading";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

interface CustomerProps {
  query: ICustomerQuery & PaginationQuery;
}

export const Customers = ({ query }: CustomerProps) => {
  const { account } = useSelector(accountSelector);
  const { isLoading, data, isSuccess, isError, isFetching } = useGetCustomersQuery(
    account?.has_customers ? { ...query } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const content = !account?.has_customers ? (
    <CustomerEmpty />
  ) : isLoading ? (
    <TableLoading rows={3} />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <PageTableWrapper>
      <CustomerSort {...query} />

      <CustomerTable
        customers={data.data}
        isFetching={isFetching}
      />

      {data.meta.total_pages > 1 && <Pagination {...data.meta} />}
    </PageTableWrapper>
  ) : (
    <CustomerEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Клиенты</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={"/customers/create"}>
            <Button 
              size={"size_44"} 
              animation={"toggle"}
              className={"text-sm font-bold 1100:w-fit w-11 1100:px-6 px-0"}
              classNameChild={"1100:block hidden"}
              iconLeft={<AddIcon width={21} height={21}/>}
            >Добавить</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>
      
      {content}
    </>
  )
}
