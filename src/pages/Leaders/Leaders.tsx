import React, {
  useEffect,
  useState,
  FC,
  memo,
  useMemo,
  useCallback,
  ChangeEvent
} from 'react';
import block from 'bem-cn-lite';

import { Pagination } from '@/components/Pagination';
import { SearchType } from '@/types.d';
import { usersData } from '@/pages/Leaders/data';
import { usePagination } from '@/hooks/usePagination';
import { Loading } from '@/components/Loading';
import { Topping } from '@/components/Topping';
import { LeaderList } from '@/pages/Leaders/LeaderList';

import './Leaders.scss';

const b = block('table');

export type Props = {
  id: number;
  displayName: string;
  avatar: null | string;
  score: number;
  index?: number;
};

const Leaders: FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Props[]>([]);
  const [search, setSearch] = useState('');

  const usersPerPage = 7;

  useMemo(() => {
    const data = usersData.filter((user) => {
      return user.displayName
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });

    setUsers(data);
  }, [search]);

  const { currentData, currentPage, handlerPaginate } = usePagination({
    perPage: usersPerPage,
    data: users,
    search
  });

  const handlerSearch: SearchType = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearch(value);
    },
    [search]
  );

  // имутируем подключение к API
  useEffect(() => {
    setUsers(usersData);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className={b()}>
      <Topping title="Доска лидеров" searchHandler={handlerSearch} />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={handlerPaginate}
        currentPage={currentPage}
        search={search}
      />

      <ul>
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
