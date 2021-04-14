import React, { memo } from 'react';
import block from 'bem-cn-lite';

import { Topping } from '@/components/Topping';
import { PageMeta } from '@/components/PageMeta';
import { ForumComment } from '@/pages/ItemForum/ForumComment';
import { Editor } from '@/components/Editor';

import './ItemForum.scss';

const b = block('item-forum');

const ItemForum = () => (
  <div className={b()}>
    <PageMeta title="Форум" description="Какая интересная игра!" />
    <Topping title="Делимся секретами игры" />

    <div className={b('comments')}>
      <ForumComment right={false} />
      <ForumComment right={false} />
      <ForumComment right />
      <ForumComment right />
      <ForumComment right={false} />
    </div>

    <Editor small={false} />
  </div>
);
const WrappedItemForum = memo(ItemForum);

export { WrappedItemForum as ItemForum };
