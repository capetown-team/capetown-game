import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';
import { PaginateType } from '@/pages/Leaders/Leaders';

import './Pagination.scss';

const b = block('pagination');

export type Props = {
  usersPerPage: number;
  totalUsers: number;
  currentPage: number;
  paginate: PaginateType;
};

const Pagination: FC<Props> = ({
  usersPerPage,
  totalUsers,
  currentPage,
  paginate
}) => {
  const pageNumbers = React.useMemo(() => {
    const res: { num: number; current: boolean }[] = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i += 1) {
      if (i === currentPage) {
        res.push({ num: i, current: true });
      } else {
        res.push({ num: i, current: false });
      }
    }

    return res;
  }, [currentPage]);

  return (
    <ul className={b()}>
      {pageNumbers.map(({ num, current }) => (
        <li key={num} className={b('list')}>
          <span
            onClick={() => paginate(num)}
            className={b('link', { active: !!current })}
            role="presentation"
          >
            {num}
          </span>
        </li>
      ))}
    </ul>
  );
};

const WrappedPagination = memo(Pagination);

export { WrappedPagination as Pagination };
