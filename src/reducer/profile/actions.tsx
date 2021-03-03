import { Dispatch, Action } from 'redux';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { path } from '@/api';

import { CHANGE_PROFILE_VIEW, CHANGE_PROFILE } from './types';
import { authorize, UserType } from '../auth/actions';

type UserData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ProfileState = {
  isProfileView: boolean;
  isСhangeable: boolean;
};

type UserPassword = {
  oldPassword: string;
  newPassword: string;
};

export const changeProfileView = (value: boolean) => {
  return {
    type: CHANGE_PROFILE_VIEW,
    payload: value
  };
};

export const setIschangeProfile = (value: boolean) => {
  return {
    type: CHANGE_PROFILE,
    payload: value
  };
};

export const changeProfile = <S,>(
  userData: UserData
): ThunkAction<void, () => S, AxiosInstance, Action<string>> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    api
      .put<UserType>(`${path}/user/profile`, userData, {
        withCredentials: true
      })
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(authorize(user));
          dispatch(setIschangeProfile(false));
        }
      });
  };
};

export const changePassword = <S,>(
  userPassword: UserPassword
): ThunkAction<void, () => S, AxiosInstance, Action<string>> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    api
      .put<UserPassword>(`${path}/user/password`, userPassword, {
        withCredentials: true
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(changeProfileView(true));
        }
      });
  };
};

export const changeProfileAvatar = <S,>(
  avatar: File
): ThunkAction<void, () => S, AxiosInstance, Action<string>> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    api
      .put<UserType>(`${path}/user/profile/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(authorize(user));
        }
      });
  };
};
