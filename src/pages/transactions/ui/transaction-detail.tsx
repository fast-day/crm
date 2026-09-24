import { useGetTransactionQuery } from "@/entities/transactions";
import { CloseIcon } from "@/shared/icons";
import { Button, PageHeader, PageHeaderActions } from "@/shared/ui";
import { RequestError } from "@/widgets/layout";
import { TransactionDetails, TransactionNotFound } from "@/widgets/transactions";
import { Link } from "@tanstack/react-router";

interface ITransactionDetailProps {
  transaction_id: string;
}

export const TransactionDetail = ({ transaction_id }: ITransactionDetailProps) => {
  const { data, isLoading, isError, isFetching } = useGetTransactionQuery(
    { transaction_id },
    { refetchOnMountOrArgChange: true },
  );
  
  const content = isLoading ? (
    <div>loading</div>
  ) : data ? (
    <TransactionDetails transaction={data} isFetching={isFetching} />
  ) : isError ? (
    <TransactionNotFound />
  ) : <RequestError />

  return (
    <>
      <PageHeader>
        <PageHeaderActions>
          <Link to={"/finance/transactions"} className="block">
            <Button variant={"white"} size={"icon_44"} animation={"toggle"}>
              <CloseIcon width={18} height={18} />
            </Button>
          </Link>
        </PageHeaderActions>
      </PageHeader>

      {content}
    </>
  )
}
