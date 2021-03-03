import { AppState } from '@/reducer';

export const errorSelector = (state: AppState) => state.signup.error;
export const pendingSelector = (state: AppState) => state.signup.pending;
