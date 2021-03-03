import { AppState } from '@/reducer';

export const errorSelector = (state: AppState) => state.signin.error;
export const pendingSelector = (state: AppState) => state.signin.pending;
