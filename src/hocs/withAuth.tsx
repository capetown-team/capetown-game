import React, { useEffect, ComponentType } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkAuth } from '@/reducer/auth/actions';
import { pendingSelector } from '@/reducer/auth/selectors';
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
