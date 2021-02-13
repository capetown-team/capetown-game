import axios, { AxiosResponse } from 'axios';

type User = {
  email?: string;
  name?: string;
  login: string;
  password: string;
  avatar?: string;
};

const host = 'https://ya-praktikum.tech/api/v2';

export const isAutorizied = async (user: User) => {
  return axios(`${host}/auth/signin`, {
    method: 'post',
    data: user,
    withCredentials: true
  })
    .then((response: AxiosResponse) => {
      console.log(response);
      return true;
    })
    .catch((error: Error) => {
      console.log(error);
      return false;
    });
};

export const isRegistrationSuccess = (user: User) => {
  const data = {
    first_name: user.name,
    second_name: user.name,
    login: user.login,
    email: user.email,
    phone: '+79191234567',
    password: user.password
  };

  return axios(`${host}/auth/signup`, {
    method: 'post',
    data,
    withCredentials: true
  })
    .then((response: AxiosResponse) => {
      console.log(response);
      return true;
    })
    .catch((error: Error) => {
      console.log(error);
      return false;
    });
};
