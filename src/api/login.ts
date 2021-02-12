import axios from 'axios';

type User = {
  email?: string;
  name?: string;
  login: string;
  password: string;
  avatar?: string;
};

const host = 'https://ya-praktikum.tech/api/v2';

export const isAutorizied = async (user: User) => {
  return axios
    .post(`${host}/auth/signin`, user)
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
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

  return axios
    .post(`${host}/auth/signup`, data)
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};