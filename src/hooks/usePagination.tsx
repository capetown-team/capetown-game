import { useCallback, useMemo, useState } from 'react';
import { PaginateType } from '@/types.d';

type Data<T> = Array<T>;

type Props<T> = {
  perPage: number;
  search?: string;
  data: Data<T>;
};

interface IPaginationHook<T> {
  currentData: Data<T>;
  currentPage: number;
  handlerPaginate: PaginateType;
}

export const usePagination = <T,>(props: Props<T>): IPaginationHook<T> => {
  const { perPage, data, search } = props;

  const [currentPage, setCurrentPage] = useState(1);

  useMemo(() => {
    setCurrentPage(1);
  }, [search]);

  const handlerPaginate: PaginateType = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
    },
    [currentPage]
  );

  const currentData = useMemo(() => {
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;

    return data.slice(indexOfFirst, indexOfLast);
  }, [currentPage, data]);

  return {
    currentData,
    currentPage,
    handlerPaginate
  };
};
