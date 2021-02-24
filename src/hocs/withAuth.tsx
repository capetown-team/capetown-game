import React, { useEffect, ComponentType } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkAuth } from '@/reducer/user/actions';
import { pendingSelector } from '@/reducer/user/selectors';
import { Loading } from '@/components/Loading';

export const withAuth = <T,>(WrappedComponent: ComponentType<T>) => {
  const withPreloadComponent = (props: T) => {
    const dispatch = useDispatch();

    const isPending = useSelector(pendingSelector);

    useEffect(() => {
      dispatch(checkAuth());
    }, []);

    if (isPending) {
      return (
        <div className="app">
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return withPreloadComponent;
};
