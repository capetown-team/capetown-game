import { AppState } from '@/reducers';

export const pendingSelector = (state: AppState) => state.reply.pending;
export const errorSelector = (state: AppState) => state.reply.replies;
