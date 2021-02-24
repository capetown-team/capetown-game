import { AppState } from '@/reducer';

export const errorSelector = (state: AppState) => state.user.error;
export const pendingSelector = (state: AppState) => state.user.pending;
export const authSelector = (state: AppState) => state.user.isAuth;
export const userSelector = (state: AppState) => state.user.user;
