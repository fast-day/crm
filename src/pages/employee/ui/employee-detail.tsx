import { useAccount } from "@/entities/account";
import { useGetEmployeeQuery } from "@/entities/employee";
import { ArrowBackUpIcon, PencilEditIcon } from "@/shared/icons"
import { Button, PageHeader, PageHeaderActions, PageHeaderTitle } from "@/shared/ui"
import { EmployeeDetailLazy, EmployeeDetails, EmployeeNotFound } from "@/widgets/employee";
import { Link, useParams } from "@tanstack/react-router"
import { useSelector } from "react-redux";

export const EmployeeDetail = () => {
  const { employee_id } = useParams({ from: "/_app/_layout/employees/users/$employee_id/" });
  const { location } = useSelector(useAccount);
  const { data, isLoading, isError } = useGetEmployeeQuery({ location_id: location?.id, employee_id });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудник</PageHeaderTitle>
        <PageHeaderActions>
          <Link to={"/employees/users"}>
            <Button
              variant={"white"}
              animation={"toggle"}
              className={"px-5 text-sm font-bold"}
              size={"size_44"}
              iconLeft={<ArrowBackUpIcon width={24} height={24} />}
            >Назад</Button>
          </Link>
          <Link to={`edit`}>
            <Button
              size={"size_44"}
              animation={"toggle"}
              className={"text-sm font-bold"}
              iconLeft={<PencilEditIcon width={21} height={21}/>}
              disabled={isLoading || isError}
            >Редактировать</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {isLoading && <EmployeeDetailLazy />}
      {isError && <EmployeeNotFound />}
      {data && <EmployeeDetails employee={data} locationId={location!.id} />}
    </>
  )
}
