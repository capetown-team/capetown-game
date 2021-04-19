import { AppState } from '@/reducers';

export const pendingSelector = (state: AppState) => state.feedback.pending;
export const feedbackCreateSelector = (state: AppState) =>
  state.feedback.isSuccessCreate;
export const feedbackListSelector = (state: AppState) => state.feedback.list;
export const errorSelector = (state: AppState) => state.feedback.error;
