import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/user/reducer';

import { UserState } from '@/reducers/user/types';

export type AppState = {
  user: UserState;
};

export const reducer = combineReducers({
  user: userReducer
});
