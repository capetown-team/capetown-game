import { client, path } from '@/api';
import {
  UserType,
  SignInType,
  SignUpType,
  UserProfileType,
  UserPasswordType
} from '@/reducers/user/types';

export type ResponseUserType = {
  data: UserType;
};

export type ResponseType = {
  status: number;
  data: {
    id: number;
  };
};

export interface IApi {
  getUserInfo(): Promise<ResponseUserType>;
  logOut(): Promise<ResponseType>;
  signIn(body: SignInType): Promise<ResponseType>;
  signUp(body: SignUpType): Promise<ResponseType>;
  changeUser(body: UserProfileType): Promise<ResponseUserType>;
  changePassword(body: UserPasswordType): Promise<ResponseType>;
  changeAvatar(avatar: File): Promise<ResponseUserType>;
  postClientID(body: string): Promise<ResponseType>;
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

  const postClientID = async (code: string) => {
    console.log('postClient');
    return client.post(
      `${path}/oauth/yandex`,
      { code },
      { withCredentials: true }
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

  return {
    getUserInfo,
    logOut,
    signIn,
    signUp,
    changeUser,
    changePassword,
    changeAvatar,
    postClientID
  };
};

export const api = context();
