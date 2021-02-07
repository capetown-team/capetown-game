import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';
import './Search.scss';
import { SearchFnType } from '@/pages/Leaders/Leaders';

const b = block('search');

export type ToppingType = {
  searchHandler: SearchFnType;
};

const Search: FC<ToppingType> = ({ searchHandler }) => (
  <div className={b()}>
    <input
      className={b('input')}
      onChange={searchHandler}
      type="text"
      placeholder="Поиск"
    />
  </div>
);

export default memo(Search);
