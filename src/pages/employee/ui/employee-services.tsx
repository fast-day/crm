import { useAccount } from "@/entities/account";
import { useServicesQuery } from "@/entities/directories";
import { useGetEmployeeQuery } from "@/entities/employee";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeNotFound, EmployeeServiceSetting, EmployeeServiceSettingLazy } from "@/widgets/employee";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

interface IEmployeeServicesProps {
  employee_id: string;
}

export const EmployeeServices = ({ employee_id }: IEmployeeServicesProps) => {
  const { location } = useSelector(useAccount);

  const { data: employee, isLoading: isLoadingEmployee, isError: isErrorEmployee } = useGetEmployeeQuery(
    location ? { location_id: location.uuid, employee_id } : skipToken,
  );
  const { data: services, isLoading: isLoadingServices } = useServicesQuery();

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Услуги</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isLoadingServices && <EmployeeServiceSettingLazy />}
      {isErrorEmployee && <EmployeeNotFound />}
      {services && (
        <EmployeeServiceSetting
          employee_id={employee_id}
          isLoading={isLoadingEmployee}
          services={services}
          location_id={location!.uuid}
          active_service={employee?.services ?? []}
        />
      )
      }
    </>
  )
}
