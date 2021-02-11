interface User {
  email?: string;
  name?: string;
  login: string;
  password: string;
  avatar?: string;
}

const host = 'https://ya-praktikum.tech/api/v2';

export async function isAutorizied(user: User) {
  try {
    const response = await fetch(`${host}/auth/signin`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function isRegistrationSuccess(user: User) {
  return fetch(`${host}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      first_name: user.name,
      second_name: user.name,
      login: user.login,
      email: user.email,
      phone: '+79194234578',
      password: user.password
    })
  })
    .then((response) => response.text()) // Можно вытащить через .json()
    .then((data) => {
      return data;
    });
}
