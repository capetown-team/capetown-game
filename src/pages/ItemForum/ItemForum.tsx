import React, { memo } from 'react';
import { Topping } from '@/components/Topping';

import { PageMeta } from '@/components/PageMeta';

import './ItemForum.scss';

const ItemForum = () => (
  <>
    <PageMeta title="Форум" description="Какая интересная игра!" />
    <Topping title="Форум" />
    <hr />
    <p>Какая интересная игра!</p>
  </>
);
const WrappedItemForum = memo(ItemForum);

export { WrappedItemForum as ItemForum };
