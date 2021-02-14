import { makeApi } from './api';

type User = {
  email?: string;
  name?: string;
  login: string;
  password: string;
  avatar?: string;
};

const client = makeApi();
const path = `https://ya-praktikum.tech/api/v2`;

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

export const logout = async () => {
  return client.post(`${path}/auth/logout`, {}, { withCredentials: true });
};
