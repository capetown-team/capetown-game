import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';
import { Search } from '@/components/Search';
import { onSearch } from '@/pages/Leaders/Leaders';

import './Topping.scss';

const b = block('topping');

export type Props = {
  title: string;
  searchHandler?: onSearch;
};

const Topping: FC<Props> = ({ title, searchHandler }) => {
  return (
    <header className={b()}>
      {searchHandler ? <Search searchHandler={searchHandler} /> : null}

      <h2 className={b('title')}>{title}</h2>
    </header>
  );
};

const WrappedTopping = memo(Topping);

export { WrappedTopping as Topping };
