import { AppState } from '@/reducers';

export const pendingSelector = (state: AppState) => state.user.pending;
export const authSelector = (state: AppState) => state.user.isAuth;

export const userSelector = (state: AppState) => state.user.user;

export const errorSelector = (state: AppState) => state.user.error;
export const loadSelector = (state: AppState) => state.user.load;
