import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { EmployeeChangePassword } from "@/widgets/employee"

interface IEmployeePasswordProps {
  employee_id: string;
}

export const EmployeePassword = ({ employee_id }: IEmployeePasswordProps) => {

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Изменение пароля</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <EmployeeChangePassword employee_id={employee_id} />
    </>
  )
}
