import React, { memo, useEffect, useState } from 'react';
import block from 'bem-cn-lite';
import { data as DataForum } from '@/pages/Forum/data';
import { usePagination } from '@/hooks/usePagination';
import { Topping } from '@/components/Topping';
import { Loading } from '@/components/Loading';
import { ForumList } from '@/pages/Forum/ForumList';
import { Pagination } from '@/components/Pagination';

import './Forum.scss';

const b = block('table');

export type Props = {
  id: number;
  title: string;
  message: number;
};

const Forum = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Props[]>([]);

  const usersPerPage = 7;

  const { currentData, currentPage, handlerPaginate } = usePagination({
    perPage: usersPerPage,
    data
  });

  useEffect(() => {
    setData(DataForum);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="container">
      <Topping title="Форум" />

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={data.length}
        paginate={handlerPaginate}
        currentPage={currentPage}
      />

      <ul className={b()}>
        <li className={b('list', { header: true })}>
          <div className={b('item')}>Статус</div>
          <div className={b('item', { main: true })}>Тема</div>
          <div className={b('item', { message: true })}>Сообщения</div>
        </li>
        {currentData.map((item: Props) => (
          <ForumList key={item.id} {...item} />
        ))}
      </ul>
    </main>
  );
};

const WrappedForum = memo(Forum);

export { WrappedForum as Forum };
