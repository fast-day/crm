import { useSelector } from "react-redux";
import { useAccount } from "@/entities/account";
import { useGetEmployeeQuery } from "@/entities/employee";
import { EmployeeEditLazy, EmployeeEmpty, EmployeeNotFound } from "@/widgets/employee";
import { EmployeeEditWrapper } from "./components/employee-edit-wrapper";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { skipToken } from "@reduxjs/toolkit/query";

interface IEmployeeEditProps {
  employee_id: string;
}

export const EmployeeEdit = ({ employee_id }: IEmployeeEditProps) => {
  const { location } = useSelector(useAccount);
  const { data, isLoading, isError, isSuccess } = useGetEmployeeQuery(
    location ? { location_id: location.uuid, employee_id } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const content = isLoading ? (
    <EmployeeEditLazy /> 
  ) : isError ? (
    <EmployeeNotFound />
  ) : isSuccess ? (
    <EmployeeEditWrapper data={data} location_id={location!.uuid} />
  ) : (
    <EmployeeEmpty />
  )

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Сотрудник - редактировать</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}
