import { Props } from '@/pages/Leaders/Leaders';

interface PaginationData {
  currentPage: number;
  perPage: number;
  data: Props[];
}

interface PaginationHook {
  currentData: Props[];
}

export const usePagination = (props: PaginationData): PaginationHook => {
  const { currentPage, perPage, data } = props;

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);

  return {
    currentData
  };
};
