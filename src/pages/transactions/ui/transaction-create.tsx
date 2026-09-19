import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"

export const TransactionCreate = () => {
  return (
    <PageHeader>
      <PageHeaderTitle>Создание транзакции</PageHeaderTitle>
      <PageHeaderActions>
        <PageHeaderBackAction />
      </PageHeaderActions>
    </PageHeader>
  )
}
