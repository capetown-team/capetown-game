import { combineReducers } from 'redux';
import { userReducer } from '@/reducer/auth/reducer';
import { formReducer } from '@/reducer/forum/reducer';
import { leadersReducer } from '@/reducer/leaders/reducer';
import { signinReducer } from '@/reducer/signin/reducer';
import { signupReducer } from '@/reducer/signup/reducer';
import { profileReducer } from '@/reducer/profile/reducer';

import { ActionProps } from '@/types.d';
import { AuthState } from '@/reducer/auth/actions';
import { ProfileState } from '@/reducer/profile/actions';

export type AppState = {
  auth: AuthState;
  signin: ActionProps;
  signup: ActionProps;
  profile: ProfileState;
  userSettings: ActionProps;
  leaders: ActionProps;
};

export const reducer = combineReducers({
  auth: userReducer,
  forum: formReducer,
  loader: leadersReducer,
  signin: signinReducer,
  singup: signupReducer,
  profile: profileReducer
});
