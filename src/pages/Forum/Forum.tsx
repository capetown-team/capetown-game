import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import block from 'bem-cn-lite';

import { usePagination } from '@/hooks/usePagination';
import { Topping } from '@/components/Topping';
import { Loading } from '@/components/Loading';
import { ForumList } from '@/pages/Forum/ForumList';
import { Pagination } from '@/components/Pagination';
import { PageMeta } from '@/components/PageMeta';

import './Forum.scss';

import { topicsSelector, pendingSelector } from '@/reducers/forum/selectors';
import { getTopics } from '@/reducers/forum/actions';
import { AppState } from '@/reducers';
import { TopicProps } from '@/reducers/forum/types';

const b = block('table');

const Forum = () => {
  const dispatch = useDispatch();

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

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={data.length}
        paginate={handlerPaginate}
        currentPage={currentPage}
      />

      <ul>
        <li className={b('list', { header: true })}>
          <div className={b('item')}>Статус</div>
          <div className={b('item', { main: true })}>Тема</div>
          <div className={b('item', { message: true })}>Сообщения</div>
        </li>
        {currentData.map((item: TopicProps) => (
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
