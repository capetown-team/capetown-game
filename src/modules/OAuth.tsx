import { client, path } from '@/api';

const getClientID = async () => {
  return client.get(`${path}/oauth/yandex/service-id`);
};

export const getCode = () => {
  const params = new URLSearchParams(document.location.search);
  return params.get('code');
};

export const getCodeOAuth = async () => {
  const responce = await getClientID();
  const clientId = responce.data.service_id;
  const redirectURL = 'http://localhost:5000/';
  const urlAuth = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURL}`;
  document.location.href = urlAuth;
};
