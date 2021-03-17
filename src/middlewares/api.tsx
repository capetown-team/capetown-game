import { client, path } from '@/api';
import {
  UserType,
  SignInType,
  SignUpType,
  UserProfileType,
  UserPasswordType
} from '@/reducers/user/types';

import {
  LeaderBoardType,
  LeaderBoardAllType
} from '@/reducers/leaderBoard/types';

export type ResponseUserType = {
  data: UserType;
};

export type ResponseType = {
  status: number;
  data: {
    id: number;
  };
};

export type ResponseLeaders = {
  data: LeaderBoardType[];
};

export interface IApi {
  getUserInfo(): Promise<ResponseUserType>;
  logOut(): Promise<ResponseType>;
  signIn(body: SignInType): Promise<ResponseType>;
  signUp(body: SignUpType): Promise<ResponseType>;
  changeUser(body: UserProfileType): Promise<ResponseUserType>;
  changePassword(body: UserPasswordType): Promise<ResponseType>;
  changeAvatar(avatar: File): Promise<ResponseUserType>;
  setLiderBoardResult(body: LeaderBoardType): Promise<ResponseType>;
  getLiderBoardAll(data: LeaderBoardAllType): Promise<ResponseLeaders>;
}

const context = (): IApi => {
  const getUserInfo = () => {
    return client.get(`${path}/auth/user`, { withCredentials: true });
  };

  const logOut = async () => {
    return client.post(
      `${path}/auth/logout`,
      {},
      {
        withCredentials: true
      }
    );
  };

  const signIn = async (data: SignInType) => {
    return client.post(`${path}/auth/signin`, data, {
      withCredentials: true
    });
  };

  const signUp = async (data: SignUpType) => {
    return client.post(`${path}/auth/signup`, data, {
      withCredentials: true
    });
  };

  const changeUser = async (data: UserProfileType) => {
    return client.put(`${path}/user/profile`, data, {
      withCredentials: true
    });
  };

  const changePassword = async (data: UserPasswordType) => {
    return client.put(`${path}/user/password`, data, {
      withCredentials: true
    });
  };

  const changeAvatar = async (avatar: File) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return client.put(`${path}/user/profile/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  };

  const setLiderBoardResult = async (data: LeaderBoardType) => {
    return client.post(`${path}/leaderboard`, data, {
      withCredentials: true
    });
  };

  const getLiderBoardAll = (data: LeaderBoardAllType) => {
    return client.post(`${path}/leaderboard/all`, data, {
      withCredentials: true
    });
  };

  return {
    getUserInfo,
    logOut,
    signIn,
    signUp,
    changeUser,
    changePassword,
    changeAvatar,
    getLiderBoardAll,
    setLiderBoardResult
  };
};

export const getLiderBoardAll = async (data: LeaderBoardAllType) => {
  return client.post(`${path}/leaderboard/all`, data, {
    withCredentials: true
  });
};

export const api = context();
