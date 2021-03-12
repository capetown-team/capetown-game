import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';

import {
  AUTH_REQUEST,
  AUTH_CHECK_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  LOGOUT,
  PROFILE_SUCCESS
} from './constants';
import {
  UserType,
  SignInType,
  SignUpType,
  UserProfileType,
  UserPasswordType
} from './types';

export const authorize = (userInfo: { user: UserType }) => {
  return {
    type: USER_SUCCESS,
    payload: userInfo
  };
};

const authRequest = () => {
  return {
    type: AUTH_REQUEST
  };
};

const userRequest = () => {
  return {
    type: USER_REQUEST
  };
};

const authCheckFailure = () => {
  return {
    type: AUTH_CHECK_FAILURE
  };
};

const updateProfile = () => {
  return {
    type: PROFILE_SUCCESS
  };
};

export const userFailure = (error: string) => {
  return {
    type: USER_FAILURE,
    payload: {
      error
    }
  };
};

export const checkAuth = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (
    dispatch: Dispatch,
    getState,
    { getUserInfo }
  ): Promise<void> => {
    dispatch(authRequest());
    getUserInfo()
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(authorize(user));
        }
      })
      .catch(() => {
        dispatch(authCheckFailure());
      });
  };
};

export const logout = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (dispatch: Dispatch, getState, { logOut }): Promise<void> => {
    dispatch(userRequest());
    logOut()
      .then(() => {
        dispatch({
          type: LOGOUT
        });
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  };
};

export const signIn = <S,>(
  userSignin: SignInType
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { signIn, getUserInfo }
  ): Promise<void> => {
    dispatch(userRequest());
    signIn(userSignin)
      .then(async (response) => {
        if (response.data) {
          getUserInfo()
            .then((response) => {
              if (response.data) {
                const user: { user: UserType } = { user: response.data };
                dispatch(authorize(user));
              }
            })
            .catch((error) => {
              dispatch(userFailure(error));
            });
        }
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  };
};

export const signinOAuth = <S,>(
  code: string
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { postClientID, getUserInfo }
  ): Promise<void> => {
    console.log('code1', code);
    dispatch(userRequest());
    postClientID(code)
      .then(async (response) => {
        if (response.data) {
          getUserInfo()
            .then((response) => {
              if (response.data) {
                const user: { user: UserType } = { user: response.data };
                dispatch(authorize(user));
              }
            })
            .catch((error) => {
              dispatch(userFailure(error));
            });
        }
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  };
};

export const signUp = <S,>(
  userSignup: SignUpType
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (dispatch: Dispatch, getState, { signUp }): Promise<void> => {
    dispatch(userRequest());
    signUp(userSignup)
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = {
            user: {
              id: response.data.id,
              login: userSignup.login,
              avatar: '',
              first_name: userSignup.first_name,
              second_name: userSignup.second_name,
              display_name: '',
              email: userSignup.email,
              phone: userSignup.phone
            }
          };
          dispatch(authorize(user));
        }
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  };
};

export const changeProfile = <S,>(
  userData: UserProfileType
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { changeUser }
  ): Promise<void> => {
    dispatch(userRequest());
    changeUser(userData)
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(authorize(user));
        }
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  };
};

export const changePassword = <S,>(
  userPassword: UserPasswordType
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { changePassword }
  ): Promise<void> => {
    dispatch(userRequest());
    changePassword(userPassword)
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateProfile());
        }
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  };
};

export const changeProfileAvatar = <S,>(
  avatar: File
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { changeAvatar }
  ): Promise<void> => {
    dispatch(userRequest());
    changeAvatar(avatar)
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(authorize(user));
        }
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  };
};
