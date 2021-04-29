import { client, path } from '@/api';

const getClientID = async () => {
  const redirect_uri = window.location.origin;
  return client.get(
    `${path}/oauth/yandex/service-id?redirect_uri=${redirect_uri}`
  );
};

export const getCode = () => {
  const params = new URLSearchParams(document.location.search);
  return params.get('code');
};

export const getCodeOAuth = async () => {
  const responce = await getClientID();
  const clientId = responce.data.service_id;
  const redirectURL = window.location.origin;
  const urlAuth = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURL}`;
  document.location.href = urlAuth;
};
