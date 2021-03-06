import React, {
  useState,
  FC,
  memo,
  useMemo,
  useCallback,
  ChangeEvent,
  useEffect
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import block from 'bem-cn-lite';

import {
  leadersSelector,
  pendingSelector
} from '@/reducers/leaderBoard/selectors';
import { getLiderBoardAll } from '@/reducers/leaderBoard/actions';
import { AppState } from '@/reducers';
import { Pagination } from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Loading } from '@/components/Loading';
import { Topping } from '@/components/Topping';
import { LeaderList } from '@/pages/Leaders/LeaderList';
import { PageMeta } from '@/components/PageMeta';
import { InputType, RouterFetchDataArgs } from '@/types.d';

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
  const [users, setUsers] = useState<Props[]>([]);
  const [search, setSearch] = useState('');

  const usersPerPage = 7;

  const { usersData, loading } = useSelector((state: AppState) => {
    return {
      usersData: leadersSelector(state),
      loading: pendingSelector(state)
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getLiderBoardAll({
        ratingFieldName: 'pacmanScore',
        cursor: 0,
        limit: 1000
      })
    );
  }, [dispatch]);

  useMemo(() => {
    if (usersData !== []) {
      const data = usersData.filter((user) => {
        return user.displayName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      });

      setUsers(data);
    }
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
      <PageMeta title="Доска лидеров" />
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

export const fetchData = ({ dispatch, cookies }: RouterFetchDataArgs) => {
  return dispatch(
    getLiderBoardAll(
      {
        ratingFieldName: 'pacmanScore',
        cursor: 0,
        limit: 1000
      },
      cookies
    )
  );
};

const WrappedLeaders = memo(Leaders);

export { WrappedLeaders as Leaders };
