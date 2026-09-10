import { accountSelector } from "@/entities/account";
import { dialogSelector } from "@/entities/dialog";
import { useGetEmployeeQuery } from "@/entities/employee";
import { PencilEditIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { EmployeeDetailLazy, EmployeeEmpty } from "@/widgets/employee";
import { RequestError } from "@/widgets/layout";
import { DeleteMeAccount, ProfileInfo } from "@/widgets/profile";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { location, account } = useSelector(accountSelector);
  const { dialog } = useSelector(dialogSelector);
  
  const { data, isLoading, isError, isSuccess } = useGetEmployeeQuery(
    location && account ? { location_id: location.uuid, employee_id: account.uuid } : skipToken,
  );

  const content = isLoading ? (
    <EmployeeDetailLazy />
  ) : isError ? (
    <RequestError />
  ) : isSuccess ? (
    <ProfileInfo employee={data} />
  ) : (
    <EmployeeEmpty />
  )
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Профиль</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
          <Link to={`/employees/users/${data?.profile.id}/edit`}>
            <Button
              size={"size_44"}
              animation={"toggle"}
              className={"text-sm font-bold 1100:w-fit w-11 1100:px-6 px-0"}
              classNameChild={"1100:block hidden"}
              iconLeft={<PencilEditIcon width={21} height={21}/>}
              disabled={isLoading || isError}
            >Редактировать</Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {content}

      {dialog.name === "me_delete" && <DeleteMeAccount profile_id={dialog.data.profile_id} />}
    </>
  )
}
