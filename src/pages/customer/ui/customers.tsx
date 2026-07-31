import { accountSelector } from "@/entities/account";
import { useGetCustomersQuery, type ICustomerQuery } from "@/entities/customers";
import { AddIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { CustomerEmpty, CustomerTable } from "@/widgets/customer";
import { TableLoading } from "@/widgets/loading";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

interface CustomerProps {
  query: ICustomerQuery & PaginationQuery;
}

export const Customers = ({ query }: CustomerProps) => {
  const { account } = useSelector(accountSelector);
  const { isLoading, data, isSuccess, isFetching } = useGetCustomersQuery(
    account?.has_customers ? { ...query } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const content = !account?.has_customers ? (
    <CustomerEmpty />
  ) : isLoading ? (
    <TableLoading rows={3} />
  ) : isSuccess ? (
    <CustomerTable customers={data.data} isFetching={isFetching} meta={data.meta} query={query} />
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
              className={"text-sm font-bold"}
              iconLeft={<AddIcon width={21} height={21}/>}
            >Добавить</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>
      
      {content}
    </>
  )
}
