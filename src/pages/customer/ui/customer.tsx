import { useGetCustomerQuery } from "@/entities/customers";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { CustomerDetailLazy, CustomerDetails, CustomerNotFound } from "@/widgets/customer";
import { useParams } from "@tanstack/react-router"

export const Customer = () => {
  const { customer_id } = useParams({ from: "/_app/_layout/customers/$customer_id/" });
  const { data, isLoading, isError, isSuccess } = useGetCustomerQuery(
    { customer_id },
    { refetchOnMountOrArgChange: true },
  );

  const content = isLoading ? (
    <CustomerDetailLazy />
  ) : isError ? (
    <CustomerNotFound />
  ) : isSuccess ? (
    <CustomerDetails customer={data} />
  ) : (
    <CustomerNotFound />
  )
  
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Клиент</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />

        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}
