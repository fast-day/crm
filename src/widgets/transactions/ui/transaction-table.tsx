import type { ITransaction } from "@/entities/transactions"
import { TransactionTableMobile } from "./table/transaction-table-mobile";
import { TransactionTableDesktop } from "./table/transaction-table-desktop";
import { useMediaQuery } from "react-responsive";

interface ITransactionTableProps {
  transactions: ITransaction[];
  isFetching: boolean;
}

export const TransactionTable = ({ transactions, isFetching }: ITransactionTableProps) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });

  return (
    <>
      {isTablet ?
        <TransactionTableMobile transactions={transactions} isFetching={isFetching} />
        :
        <TransactionTableDesktop transactions={transactions} isFetching={isFetching} />
      }
    </>
  )
}
