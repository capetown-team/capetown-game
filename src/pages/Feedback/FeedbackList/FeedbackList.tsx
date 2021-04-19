import React, { memo, useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { AppState } from '@/reducers';
import {
  feedbackListSelector,
  pendingSelector
} from '@/reducers/feedback/selectors';
import { listFeedback } from '@/reducers/feedback/actions';
import { Loading } from '@/components/Loading';

import './FeedbackList.scss';

const b = block('feedback-list');

const FeedbackList = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const { listData, pending } = useSelector((state: AppState) => {
    return {
      pending: pendingSelector(state),
      listData: feedbackListSelector(state)
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(listFeedback());
  }, [dispatch]);

  useEffect(() => {
    setLoading(pending);
  }, [pending]);

  return (
    <div className={b()}>
      {isLoading && <Loading />}

      {listData.length > 0 ? (
        listData.map((list) => {
          return (
            <div key={list._id} className={b('list')}>
              <div className={b('title')}>{list.name}</div>
              <div className={b('text')}>{list.text}</div>
            </div>
          );
        })
      ) : (
        <div className={b('list')}>Отзывы отсутствуют</div>
      )}
    </div>
  );
};

const WrappedFeedbackList = memo(FeedbackList);

export { WrappedFeedbackList as FeedbackList };
