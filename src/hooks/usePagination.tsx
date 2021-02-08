import { Props as leaderData } from '@/pages/Leaders/Leaders';

// type Data<T extends string | number> = T[];

type Props = {
  currentPage: number;
  perPage: number;
  data: leaderData[];
};

interface PaginationHook {
  currentData: leaderData[];
}

export const usePagination = (props: Props): PaginationHook => {
  const { currentPage, perPage, data } = props;

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);

  return {
    currentData
  };
};
