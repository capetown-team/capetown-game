import { combineReducers } from 'redux';
import { userReducer } from '@/reducer/user/reducer';
import { formReducer } from '@/reducer/forum/reducer';
import { leadersReducer } from '@/reducer/leaders/reducer';
import { signinReducer } from '@/reducer/signin/reducer';
import { signupReducer } from '@/reducer/signup/reducer';

import { ActionProps } from '@/types.d';
import { UserState } from '@/reducer/user/actions';

export type AppState = {
  user: UserState;
  signin: ActionProps;
  signup: ActionProps;
  userSettings: ActionProps;
  leaders: ActionProps;
};

export const reducer = combineReducers({
  user: userReducer,
  forum: formReducer,
  loader: leadersReducer,
  signin: signinReducer,
  singup: signupReducer
});
