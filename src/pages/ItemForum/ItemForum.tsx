import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import block from 'bem-cn-lite';

import { Topping } from '@/components/Topping';
import { PageMeta } from '@/components/PageMeta';
import { ForumComment } from '@/pages/ItemForum/ForumComment';
import { Editor } from '@/components/Editor';

import { commentsSelector } from '@/reducers/forum/selectors';
import { getComments } from '@/reducers/forum/actions';
import { getTopicId } from '@/pages/Forum/helper';

import { messageProps } from '@/reducers/forum/types';

import './ItemForum.scss';

const b = block('item-forum');

const ItemForum = () => {
  const dispatch = useDispatch();
  const topicId = getTopicId();
  const [data, setData] = useState([]);
  const [topicName, setTopicName] = useState('');

  useEffect(() => {
    dispatch(getComments(Number(topicId)));
  }, [dispatch, topicId]);

  const currentData = useSelector(commentsSelector);

  useEffect(() => {
    if (currentData !== undefined) {
      if (currentData.comments !== undefined) {
        setData(currentData.comments.messages);
        if (currentData.comments.topic !== null)
          setTopicName(currentData.comments.topic.name);
      }
    }
  }, [currentData]);

  return (
    <div className={b()}>
      <PageMeta title="Форум" description="Форум" />
      <Topping title={topicName} />

      <div className={b('comments')}>
        {data.map((item: messageProps) => (
          <ForumComment
            right={item.right}
            id={item.id}
            key={String(item.right) + String(item.key)}
            name={item.name}
            content={item.content}
            time={item.time}
            countComments={item.replies}
            countLikes={item.likes}
            topicId={topicId}
            avatar={item.avatar}
          />
        ))}
      </div>

      <Editor small={false} />
    </div>
  );
};
const WrappedItemForum = memo(ItemForum);

export { WrappedItemForum as ItemForum };
