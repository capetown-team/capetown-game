import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';
import { Props } from '@/pages/Forum/Forum';

const b = block('table');

const ForumList: FC<Props> = ({ id, title, message }) => (
  <li className={b('list')}>
    <div className={b('item')}>
      <div className={b('page')} />
    </div>
    <div className={b('item', { main: true })}>
      <Link to={`/forum/${id}`}>{title}</Link>
    </div>
    <div className={b('item', { message: true })}>{message}</div>
  </li>
);

const WrappedForumList = memo(ForumList);

export { WrappedForumList as ForumList };
