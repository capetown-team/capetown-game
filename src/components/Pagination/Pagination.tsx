import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';
import { PaginateType } from '@/pages/Leaders/Leaders';

import './Pagination.scss';

const b = block('pagination');

export type NumberType = {
  usersPerPage: number;
  totalUsers: number;
  currentPage: number;
  paginate: PaginateType;
};

const Pagination: FC<NumberType> = ({
  usersPerPage,
  totalUsers,
  currentPage,
  paginate
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i += 1) {
    if (i === currentPage) {
      pageNumbers.push({ num: i, current: true });
    } else {
      pageNumbers.push({ num: i, current: false });
    }
  }
  return (
    <ul className={b()}>
      {pageNumbers.map((item) => (
        <li key={item.num} className="pagination__list">
          <span
            onClick={() => paginate(item.num)}
            className={item.current ? b('link', { active: true }) : b('link')}
            role="presentation"
          >
            {item.num}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default memo(Pagination);
