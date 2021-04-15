import React, { memo, useCallback, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import block from 'bem-cn-lite';
import { useHistory } from 'react-router-dom';

import { usePagination } from '@/hooks/usePagination';
import { Topping } from '@/components/Topping';
import { Loading } from '@/components/Loading';
import { ForumList } from '@/pages/Forum/ForumList';
import { Pagination } from '@/components/Pagination';
import { PageMeta } from '@/components/PageMeta';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants';

import './Forum.scss';

import { topicsSelector, pendingSelector } from '@/reducers/forum/selectors';

import { getTopics, addTopic } from '@/reducers/forum/actions';
import { AppState } from '@/reducers';

const b = block('table');

export type Props = {
  id: number;
  name: string;
  message: number;
};

const Forum = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const submitHandler = useCallback(
    (e: MouseEvent<Element>) => {
      e.preventDefault();
      history.replace(ROUTES.INPUTFORUM);
    },
    [history]
  );

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const { data, loading } = useSelector((state: AppState) => {
    return {
      data: topicsSelector(state),
      loading: pendingSelector(state)
    };
  });

  const usersPerPage = 7;

  const { currentData, currentPage, handlerPaginate } = usePagination({
    perPage: usersPerPage,
    data
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <main className={b()}>
      <PageMeta title="Форум" />
      <Topping title="Форум" />
      <div className={b('row')}>
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={data.length}
          paginate={handlerPaginate}
          currentPage={currentPage}
        />
        <div className={b('header-button')}>
          <Button
            type="submit"
            size="m"
            onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
              submitHandler(e)
            }
          >
            {' '}
            Создать тему
          </Button>
        </div>
      </div>
      <ul>
        <li className={b('list', { header: true })}>
          <div className={b('item')}>Статус</div>
          <div className={b('item', { main: true })}>Тема</div>
          <div className={b('item', { message: true })}>Сообщения</div>
        </li>
        {currentData.map((item: Props) => (
          <ForumList
            key={item.id}
            id={item.id}
            title={item.name}
            message={item.message}
          />
        ))}
      </ul>
    </main>
  );
};

const WrappedForum = memo(Forum);

export { WrappedForum as Forum };
