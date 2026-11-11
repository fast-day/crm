import { Skeleton, Table, TableBody, TableHeader, TableRow } from "@/shared/ui";
import { cn } from "@/shared/utils";

interface TableLoadingProps {
  rows?: number;
  isAction?: boolean;
  skeletonCls?: string;
}

export const TableLoading = ({ rows=3, isAction=true, skeletonCls="" }: TableLoadingProps) => {
  return (
    <Table className="mt-8">

      <TableHeader className="rounded-none">
        <TableRow className="hover:bg-transparent! px-5">
          {Array.from({ length: rows }).map((_, idx) => <Skeleton key={idx} className={`max-w-35! h-6 rounded-lg ${idx === (isAction ? rows - 1 : rows) ? "bg-transparent" : ""}`} />)}
        </TableRow>
      </TableHeader>

      <TableBody className="bg-transparent! mt-2 peer-hover:rounded-t-3xl!">
        <Skeleton className={cn("1100:h-18 1100:rounded-none", skeletonCls)} />
        <Skeleton className={cn("1100:h-18 1100:rounded-none", skeletonCls)} />
        <Skeleton className={cn("1100:h-18 1100:rounded-none", skeletonCls)} />
      </TableBody>

    </Table>
  )
}
