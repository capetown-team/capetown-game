import React, { useEffect, useState, FC, memo } from 'react';
import block from 'bem-cn-lite';
import { Pagination } from '@/components/Pagination';
import { usersData } from '@/pages/Leaders/data';
import { Loading } from '@/components/Loading';
import { Topping } from '@/components/Topping';
import { LeaderList } from '@/pages/Leaders/LeaderList';
import { usePagination } from '@/hooks/usePagination';

import './Leaders.scss';

const b = block('table');

export type Props = {
  id: number;
  displayName: string;
  avatar: null | string;
  score: number;
  index?: number;
};

export type onSearch = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type PaginateType = (num: number) => void;

const Leaders: FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Props[]>([]);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  // имутируем подключение к API
  useEffect(() => {
    setUsers(usersData);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filterUsers = users.filter((user) => {
    return user.displayName
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  const { currentData } = usePagination({
    currentPage,
    perPage: usersPerPage,
    data: filterUsers
  });

  // change page
  const handlerPaginate: PaginateType = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlerSearch: onSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCurrentPage(1);
    setSearch(value);
  };

  return (
    <main>
      <Topping title="Доска лидеров" searchHandler={handlerSearch} />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filterUsers.length}
        paginate={handlerPaginate}
        currentPage={currentPage}
      />

      <ul className={b()}>
        <li className={b('list', { header: true })}>
          <div className={b('item')}>#</div>
          <div className={b('item')}>Ава</div>
          <div className={b('item', { main: true })}>Игрок</div>
          <div className={b('item')}>Очки</div>
        </li>

        {currentData.map((user: Props, index: number) => (
          <LeaderList key={user.id} {...user} index={index} />
        ))}
      </ul>
    </main>
  );
};

const WrappedLeaders = memo(Leaders);

export { WrappedLeaders as Leaders };
