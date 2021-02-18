import React, { memo } from 'react';
import { Topping } from '@/components/Topping';

import './ItemForum.scss';

const ItemForum = () => (
  <>
    <Topping title="Форум" />
    <hr />
    <p>Какая интересная игра!</p>
  </>
);
const WrappedItemForum = memo(ItemForum);

export { WrappedItemForum as ItemForum };
