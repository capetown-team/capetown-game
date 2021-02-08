import React, { useEffect, useState, FC } from 'react';
import block from 'bem-cn-lite';
import Pagination from '@/components/Pagination';
import { usersData } from '@/pages/Leaders/data';
import { Loading } from '@/components/Loading';
import Topping from '@/components/Topping';
import LeaderList from '@/pages/Leaders/LeaderList';
import './Leaders.scss';

const b = block('table');

export type UserType = {
  id: number;
  displayName: string;
  avatar: null | string;
  score: number;
};

export type SearchFnType = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type PaginateType = (num: number) => void;

export const Leaders: FC = () => {
  const [loading, setLoading] = useState(true);
  const usersEmpty: UserType[] = [];
  const [users, setUsers] = useState(usersEmpty);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);

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

  // Получаем текущих пользователей пагинации 13-45
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);

  // change page
  const handlerPaginate: PaginateType = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlerSearch: SearchFnType = (
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

      <div className={b()}>
        <div className={b('list', { header: true })}>
          <div className={b('item')}>#</div>
          <div className={b('item')}>Ава</div>
          <div className={b('item', { main: true })}>Игрок</div>
          <div className={b('item')}>Очки</div>
        </div>

        {currentUsers.map((user: UserType, index: number) => (
          <LeaderList key={user.id} {...user} index={index} />
        ))}
      </div>
    </main>
  );
};
