import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';
import Search from '@/components/Search';
import './Topping.scss';
import { SearchFnType } from '@/pages/Leaders/Leaders';

const b = block('topping');

export type ToppingType = {
  title: string;
  searchHandler?: SearchFnType;
};

const Topping: FC<ToppingType> = ({ title, searchHandler }) => {
  return (
    <header className={b()}>
      {searchHandler ? <Search searchHandler={searchHandler} /> : null}

      <h2 className={b('title')}>{title}</h2>
    </header>
  );
};

export default memo(Topping);
