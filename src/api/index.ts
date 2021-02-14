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

export const authApi = () => {
  const signUp = (user: User) => {
    return client.post<User>(`${path}/auth/signup`, user, {
      withCredentials: true
    });
  };

  const signIn = (user: User) => {
    return client.post<User>(`${path}/auth/signin`, user, {
      withCredentials: true
    });
  };

  const logout = () => {
    return client.post(`${path}/logout`, {}, { withCredentials: true });
  };

  return {
    signUp,
    signIn,
    logout
  };
};
