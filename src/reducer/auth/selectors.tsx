import { AppState } from '@/reducer';

export const errorSelector = (state: AppState) => state.auth.error;
export const pendingSelector = (state: AppState) => state.auth.pending;
export const authSelector = (state: AppState) => state.auth.isAuth;
export const userSelector = (state: AppState) => state.auth.user;
export const errorSigninSelector = (state: AppState) => state.auth.signinError;
export const errorSignupSelector = (state: AppState) => state.auth.signupError;
