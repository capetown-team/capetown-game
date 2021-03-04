import React, { memo, FC } from 'react';
import block from 'bem-cn-lite';
import { Search } from '@/components/Search';
import { InputType } from '@/types.d';

import './Topping.scss';

const b = block('topping');

export type Props = {
  title: string;
  searchHandler?: InputType;
};

const Topping: FC<Props> = ({ title, searchHandler }) => {
  return (
    <header className={b()}>
      {searchHandler && <Search searchHandler={searchHandler} />}

      <h2 className={b('title')}>{title}</h2>
    </header>
  );
};

const WrappedTopping = memo(Topping);

export { WrappedTopping as Topping };
