import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { CustomerInviteForm } from "./components/customer-invite-form";

export const CustomerCreate = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Добавление клиента</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <CustomerInviteForm />
    </>
  )
}
