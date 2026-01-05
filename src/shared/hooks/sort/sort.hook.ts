import { useMemo, useState } from "react"

export type SortOrder = "default" | "asc" | "desc";

interface SortCriterion<T> {
  field: keyof T;
  order: SortOrder;
}

interface SortReturnProps<T> {
  sort: SortCriterion<T>[];
  sortedData: T[];
  toggleSort: (field: keyof T) => void;
  clearSort: () => void;
}

export const useSort = <T>(data: T[]): SortReturnProps<T> => {
  const [sort, setSort] = useState<SortCriterion<T>[]>([]);

  const toggleSort = (field: keyof T) => {
    setSort(p => {
      const idx = p.findIndex(c => c.field === field);
      if (idx === -1) return [...p, { field, order: "asc" }];

      const { order } = p[idx];

      if (order === "asc") return p.map((c, i) => i === idx ? { ...c, order: "desc" } : c);
      if (order === "desc") return p.filter(c => c.field !== field);

      return p;
    });
  }

  const clearSort = () => setSort([]);

  const sortedData = useMemo(() => {
    if (sort.length === 0) return data;

    return [...data].sort((a, b) => {
      for (const { field, order } of sort) {
        const A = a[field];
        const B = b[field];
        let cmp = 0;
        
        if (typeof A === "string" && typeof B === "string") {
          cmp = A.localeCompare(B);
        } else if (typeof A === "number" && typeof B === "number") {
          cmp = A - B;
        } else if (typeof A === "boolean" && typeof B === "boolean") {
          cmp = Number(A) - Number(B);
        }

        if (cmp !== 0) return order === "asc" ? cmp : -cmp;
      }

      return 0;
    });
  }, [data, sort]);

  return {
    sort,
    sortedData,
    toggleSort,
    clearSort,
  }
}