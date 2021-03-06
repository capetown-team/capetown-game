import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/user/reducer';
// import { signinReducer } from '@/reducers/signin/reducer';
// import { signupReducer } from '@/reducers/signup/reducer';
// import { profileReducer } from '@/reducers/profile/reducer';

import { UserState } from '@/reducers/user/types';
// import { ActionProps } from '@/types.d';
// import { AuthState } from '@/reducers/auth/actions';
// import { AuthState } from '@/reducers/auth/actions';
// import { SignInState } from '@/reducers/signin/actions';
// import { SignUpState } from '@/reducers/signup/actions';
// import { ProfileState } from '@/reducers/profile/actions';

// export type AppState = {
//   auth: AuthState;
//   signin: SignInState;
//   signup: SignUpState;
//   profile: ProfileState;
//   userSettings: ActionProps;
// };
//
// export const reducer = combineReducers({
//   auth: userReducer,
//   signin: signinReducer,
//   signup: signupReducer,
//   profile: profileReducer
// });

export type AppState = {
  user: UserState;
};

export const reducer = combineReducers({
  user: userReducer
});
