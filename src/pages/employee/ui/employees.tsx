import { accountSelector } from "@/entities/account"
import { useGetEmployeesQuery, type IEmployeeQuery } from "@/entities/employee"
import { Can } from "@/features/auth"
import { AddIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeEmpty, EmployeeTable } from "@/widgets/employee"
import { TableLoading } from "@/widgets/loading"
import { skipToken } from "@reduxjs/toolkit/query"
import { Link } from "@tanstack/react-router"
import { useSelector } from "react-redux"

interface EmployeeProps {
  query: IEmployeeQuery & PaginationQuery;
}

export const Employees = ({ query }: EmployeeProps) => {
  const { location, account } = useSelector(accountSelector);
  const { isLoading, data, isSuccess, isFetching } = useGetEmployeesQuery(
    location ?
    {
      ...query,
      location_id: location.id,
    } : skipToken,
  );

  // const hasActiveFilters = !query.status || !query.role || !query.search;

  const content = isLoading ? (
    <TableLoading rows={4} />
  ) : isSuccess && account?.has_employees ? (
    <EmployeeTable employees={data.data} meta={data.meta} isFetching={isFetching} profileId={account?.id} query={query} />
  ) : (
    <EmployeeEmpty />
  );

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудники</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Can permission={"employee:invite"}>
            <Link to={"/employees/users/create"}>
              <Button 
                size={"size_44"}
                animation={"toggle"}
                className={"text-sm font-bold"}
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
