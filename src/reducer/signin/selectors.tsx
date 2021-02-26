import { AppState } from '@/reducer';

export const errorSelector = (state: AppState) => state.signin.error;
export const pendingSelector = (state: AppState) => state.signin.pending;
export const signInSelector = (state: AppState) => state.signin.isSignIn;
export const userSelector = (state: AppState) => state.signin.user;
