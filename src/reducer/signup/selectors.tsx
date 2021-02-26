import { AppState } from '@/reducer';

export const errorSelector = (state: AppState) => state.signup.error;
export const pendingSelector = (state: AppState) => state.signup.pending;
export const signUpSelector = (state: AppState) => state.signup.isSignUp;
export const userSelector = (state: AppState) => state.signup.user;
