import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';
import { onSearch } from '@/pages/Leaders/Leaders';

import './Search.scss';

const b = block('search');

export type Props = {
  searchHandler: onSearch;
};

const Search: FC<Props> = ({ searchHandler }) => (
  <div className={b()}>
    <input
      className={b('input')}
      onChange={searchHandler}
      type="text"
      placeholder="Поиск"
    />
  </div>
);

const WrappedSearch = memo(Search);

export { WrappedSearch as Search };
