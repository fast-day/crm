/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "../debounce/debounce.hook";

interface UseSearchProps<T> {
  fields: (keyof T)[];
  action: (payload: { query: string; fields: (keyof T)[] }) => any;
  debounce?: number;
}

interface UseSearchReturnProps {
  onChange: (search: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export const useSearch = <T extends Record<string, any>>({ fields, action, debounce = 500 }: UseSearchProps<T>): UseSearchReturnProps => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  const searchDebounce = useDebounce(search, debounce);

  useEffect(() => {
    dispatch(action({ query: searchDebounce, fields }));
  }, [action, searchDebounce]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return {
    onChange,
    search,
  }
}