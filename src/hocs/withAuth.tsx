import React, { useEffect, ComponentType } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkAuth } from '@/reducers/user/actions';
import { pendingSelector } from '@/reducers/user/selectors';
import { Loading } from '@/components/Loading';

export const withAuth = <T,>(WrappedComponent: ComponentType<T>) => {
  return (props: T) => {
    const dispatch = useDispatch();

    const isPending = useSelector(pendingSelector);

    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);

    if (isPending) {
      return (
        <div className="app">
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
