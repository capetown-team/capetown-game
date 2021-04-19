import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import block from 'bem-cn-lite';

import { Topping } from '@/components/Topping';
import { PageMeta } from '@/components/PageMeta';
import { ForumComment } from '@/pages/ItemForum/ForumComment';
import { Editor } from '@/components/Editor';
import { Loading } from '@/components/Loading';

import { commentsSelector, pendingSelector } from '@/reducers/forum/selectors';
import { getComments } from '@/reducers/forum/actions';
import { getTopicId } from '@/pages/Forum/helper';

import { AppState } from '@/reducers';

import { messageProps } from '@/reducers/forum/types';

import './ItemForum.scss';

const b = block('item-forum');

const ItemForum = () => {
  const dispatch = useDispatch();
  const topicId = getTopicId();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('topicId', topicId);
    dispatch(getComments(topicId));
  }, [dispatch]);

  const { currentData, loading } = useSelector((state: AppState) => {
    console.log('data', data);
    return {
      currentData: commentsSelector(state),
      loading: pendingSelector(state)
    };
  });
  useEffect(() => {
    console.log('curdata', currentData[0]);
    if (currentData !== undefined) {
      setData(currentData[0]);
    }
  }, [currentData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={b()}>
      <PageMeta title="Форум" description="Какая интересная игра!" />
      <Topping title="Делимся секретами игры" />

      <div className={b('comments')}>
        {data.map((item: messageProps) => (
          <ForumComment
            right={false}
            name={item.name}
            content={item.content}
            time={item.time}
            countComments={item.countComments}
            countLikes={item.countLikes}
          />
        ))}
      </div>

      <Editor small={false} />
    </div>
  );
};
const WrappedItemForum = memo(ItemForum);

export { WrappedItemForum as ItemForum };
