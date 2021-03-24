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
  getLiderBoardAll(
    data: LeaderBoardAllType,
    cookies?: string
  ): Promise<ResponseLeaders>;
  postClientID(body: string): Promise<ResponseType>;
}

const context = (): IApi => {
  const getUserInfo = async () => {
    return client.get(`${path}/auth/user`);
  };

  const logOut = async () => {
    return client.post(`${path}/auth/logout`, {});
  };

  const postClientID = async (code: string) => {
    return client.post(`${path}/oauth/yandex`, { code });
  };

  const signIn = async (data: SignInType) => {
    return client.post(`${path}/auth/signin`, data);
  };

  const signUp = async (data: SignUpType) => {
    return client.post(`${path}/auth/signup`, data);
  };

  const changeUser = async (data: UserProfileType) => {
    return client.put(`${path}/user/profile`, data);
  };

  const changePassword = async (data: UserPasswordType) => {
    return client.put(`${path}/user/password`, data);
  };

  const changeAvatar = async (avatar: File) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return client.put(`${path}/user/profile/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const setLiderBoardResult = async (data: LeaderBoardType) => {
    return client.post(`${path}/leaderboard`, data);
  };

  const getLiderBoardAll = (data: LeaderBoardAllType, cookies: string) => {
    if (cookies) {
      return client.post(`${path}/leaderboard/all`, data, {
        headers: { Cookie: cookies }
      });
    }
    return client.post(`${path}/leaderboard/all`, data);
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
    setLiderBoardResult,
    postClientID
  };
};

export const getLiderBoardAll = async (data: LeaderBoardAllType) => {
  return client.post(`${path}/leaderboard/all`, data, {
    withCredentials: true
  });
};

export const api = context();
