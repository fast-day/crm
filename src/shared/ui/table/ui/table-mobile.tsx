import { cn } from "@/shared/utils";
import type { ComponentProps } from "react";

/**
  =====
    ДОБАВИЛ ЭТОТ КОМПОНЕНТ ДЛЯ ТОГО, ЧТОБЫ В БУДУЩЕМ БЕЗ
    ПРОБЛЕМ ИЗМЕНИТЬ UI ДЛЯ МОБИЛКИ, НЕ ТРОГАЯ TABLE.TSX

    НО ПО СУТИ МОЖНО БЫЛО БЫ ПРОСТО СДЕЛАТЬ ГИБКИЙ TABLE.TSX
  =====
**/

function TableMobile({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-mobile"
      className={cn("relative w-full", className)}
      {...props}
    />
  )
}

function TableMobileBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-mobile-body"
      className={cn("space-y-3 relative", className)}
      {...props}
    />
  )
}

function TableMobileRow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-mobile-row"
      className={cn("p-5 space-y-2.5 rounded-3xl bg-card/60 hover:bg-card/60 relative", className)}
      {...props}
    />
  )
}

type TableMobileCellProps = {
  thead?: string;
} & ComponentProps<"div">

function TableMobileCell({ thead, className, children, ...props }: TableMobileCellProps) {
  return (
    <div
      data-ui="table-mobile-cell"
      className={cn("grid grid-cols-2 items-center text-sm gap-2.5 font-medium leading-5", className)}
      {...props}
    >
      {thead && <div className="opacity-50">{thead}</div>}
      {children}
    </div>
  )
}

function TableMobileAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-mobile-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export {
  TableMobile,
  TableMobileBody,
  TableMobileRow,
  TableMobileCell,
  TableMobileAction,
};
