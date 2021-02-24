import { makeApi } from './api';

type User = {
  email?: string;
  name?: string;
  login: string;
  password: string;
  avatar?: string;
};

type UserData = {
  // eslint-disable-next-line camelcase
  first_name: string;
  // eslint-disable-next-line camelcase
  second_name: string;
  // eslint-disable-next-line camelcase
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type UserPassword = {
  oldPassword: string;
  newPassword: string;
};

export const client = makeApi();
export const path = `https://ya-praktikum.tech/api/v2`;

export const signUp = async (user: User) => {
  return client.post<User>(`${path}/auth/signup`, user, {
    withCredentials: true
  });
};

export const signIn = async (user: User) => {
  return client.post<User>(`${path}/auth/signin`, user, {
    withCredentials: true
  });
};

export const logOut = async () => {
  return client.post<User>(
    `${path}/auth/logout`,
    {},
    {
      withCredentials: true
    }
  );
};

export const getUserInfo = () => {
  return client.get(`${path}/auth/user`, { withCredentials: true });
};

export const changeProfile = (userData: UserData) => {
  return client.put<UserData>(`${path}/user/profile`, userData, {
    withCredentials: true
  });
};

export const changeProfileAvatar = (avatar: File) => {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return client.put<File>(`${path}/user/profile/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
};

export const changePassword = (userPassword: UserPassword) => {
  return client.put<UserPassword>(`${path}/user/password`, userPassword, {
    withCredentials: true
  });
};

export const getUserById = (userId: number) => {
  return client.get(`${path}/user/${userId}`, {
    withCredentials: true
  });
};

export const searchUserByLogin = (login: string) => {
  return client.post<{ login: string }>(
    `${path}/user/search`,
    { login },
    {
      withCredentials: true
    }
  );
};
