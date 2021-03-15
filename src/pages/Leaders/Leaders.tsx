import React, {
  useState,
  FC,
  memo,
  useMemo,
  useEffect,
  useCallback,
  ChangeEvent
} from 'react';
import block from 'bem-cn-lite';
import { postLiderBoardAll } from '@/middlewares/api';

import { Pagination } from '@/components/Pagination';
import { InputType } from '@/types.d';
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
  const loading = false;
  const [users, setUsers] = useState<Props[]>([]);
  const [usersData, setUsersData] = useState<Props[]>([]);
  const [search, setSearch] = useState('');

  const usersPerPage = 7;

  useEffect(() => {
    let isMounted = true;

    postLiderBoardAll({
      ratingFieldName: 'pacmanScore',
      cursor: 0,
      limit: 10
    }).then((response) => {
      const result: Props[] = [];
      for (let i = 0; i < response.data.length; i += 1) {
        result.push({
          id: i + 1,
          displayName: response.data[i].data.pacmanPlayer,
          avatar: response.data[i].data.pacmanAvatar,
          score: response.data[i].data.pacmanScore
        });
      }
      if (isMounted) {
        setUsers(result);
        setUsersData(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useMemo(() => {
    const data = usersData.filter((user) => {
      return user.displayName
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });

    setUsers(data);
  }, [search, usersData]);

  const { currentData, currentPage, handlerPaginate } = usePagination({
    perPage: usersPerPage,
    data: users,
    search
  });

  const handlerSearch: InputType = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearch(value);
    },
    []
  );

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
