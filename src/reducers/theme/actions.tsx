import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';

import { THEME_LIST_SUCCESS, THEME_SUCCESS, THEME_FAILURE } from './constants';
import { ThemeListType, UserThemeType } from './types';

type ThemeListSuccess = {
  type: typeof THEME_LIST_SUCCESS;
  payload: ThemeListType;
};

export const themeListSuccess = (
  themesList: ThemeListType
): ThemeListSuccess => {
  return {
    type: THEME_LIST_SUCCESS,
    payload: themesList
  };
};

type ThemeFailure = {
  type: typeof THEME_FAILURE;
};

export const themeFailure = (): ThemeFailure => {
  return {
    type: THEME_FAILURE
  };
};

type UserThemeSuccess = {
  type: typeof THEME_SUCCESS;
  payload: UserThemeType;
};

export const userThemeSuccess = (theme: UserThemeType): UserThemeSuccess => {
  return {
    type: THEME_SUCCESS,
    payload: theme
  };
};

export const getThemesList = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (
    dispatch: Dispatch,
    getState,
    { themesListRequest }
  ): Promise<void> => {
    themesListRequest()
      .then(({ data }) => {
        if (data) {
          dispatch(themeListSuccess(data));
        }
      })
      .catch(() => {
        dispatch(themeFailure());
      });
  };
};

export const getUserTheme = <S,>(
  userId: number
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { userThemeRequest, changeThemeRequest }
  ): Promise<void> => {
    userThemeRequest(userId)
      .then(({ data }) => {
        if (data) {
          dispatch(userThemeSuccess(data.theme));
        } else {
          changeThemeRequest(userId, 1).then(({ data }) => {
            if (data) {
              dispatch(userThemeSuccess(data.theme));
            }
          });
        }
      })
      .catch(() => {
        dispatch(themeFailure());
      });
  };
};

export const changeUserTheme = <S,>(
  userId: number,
  themeId: number
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { changeThemeRequest }
  ): Promise<void> => {
    changeThemeRequest(userId, themeId)
      .then(({ data }) => {
        if (data) {
          dispatch(userThemeSuccess(data.theme));
        }
      })
      .catch(() => {
        dispatch(themeFailure());
      });
  };
};

export type ThemeAction = ThemeListSuccess | ThemeFailure | UserThemeSuccess;
