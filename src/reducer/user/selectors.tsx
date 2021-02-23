import { AppState } from '@/reducer';

export const getError = (state: AppState) => state.user.error;
export const getPending = (state: AppState) => state.user.pending;
export const getAuth = (state: AppState) => state.user.isAuth;
export const getUser = (state: AppState) => state.user.user;
