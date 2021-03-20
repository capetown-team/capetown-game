import { match } from 'react-router';
import { Dispatch } from 'redux';

import { checkAuth } from '@/reducers/user/actions';
import { fetchUsers } from '@/reducers/post/actions';
import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';
import { ItemForum } from '@/pages/ItemForum';
import { Profile } from '@/pages/Profile';
import { SomeError } from '@/components/SomeError';
import { Authorization } from '@/pages/Authorization';
import { Registration } from '@/pages/Registration';
import { Game } from '@/pages/Game';
import { Landing } from '@/pages/Landing';
import { Posts } from '@/pages/Posts';
import { ROUTES } from '@/constants';

export type RouterFetchDataArgs = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  // match: string;
  match: match<{ slug: string }>;
};

export const routes = [
  {
    path: ROUTES.ROOT,
    component: Landing,
    isPrivate: false,
    exact: true
  },
  {
    path: '/post',
    component: Posts,
    isPrivate: false,
    exact: true,
    // fetchData({ dispatch }: RouterFetchDataArgs) {
    //   return dispatch(fetchUsers());
    // }
    async fetchData({ dispatch }: RouterFetchDataArgs) {
      await dispatch(fetchUsers());
    }
  },
  {
    path: ROUTES.LEADERBOARD,
    component: Leaders,
    isPrivate: true
  },
  {
    path: ROUTES.FORUM,
    component: Forum,
    exact: true,
    isPrivate: true
  },
  {
    path: ROUTES.FORUM_ITEM,
    component: ItemForum,
    exact: true,
    isPrivate: true
  },
  {
    path: ROUTES.GAME,
    component: Game,
    isPrivate: true
  },
  {
    path: ROUTES.SIGNIN,
    component: Authorization,
    isPrivate: false,
    exact: true
  },
  {
    path: ROUTES.SIGNUP,
    component: Registration,
    isPrivate: false,
    exact: true
  },
  {
    path: ROUTES.PROFILE,
    component: Profile,
    isPrivate: true,
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(checkAuth());
    }
    // fetchData({ dispatch }: RouterFetchDataArgs) {
    //   return dispatch(checkAuth());
    // }
  },
  {
    path: '/error',
    component: SomeError,
    isPrivate: false
  },
  {
    path: '*',
    component: SomeError,
    isPrivate: false
  }
];
