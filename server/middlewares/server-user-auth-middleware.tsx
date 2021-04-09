import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export const serverUserAuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authData = {
    uuid: request.cookies.uuid,
    authCookie: request.cookies.authCookie
  };

  response.locals.user = null;

  if (authData.authCookie && authData.uuid) {
    const cookies = Object.entries(authData)
      .map(([key, value]) => `${key}=${value}`)
      .join(';');

    try {
      const { data } = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
        headers: { Cookie: cookies }
      });

      response.locals.user = data;
      response.locals.cookies = cookies;
    } catch (err) {
      response.locals.user = null;
      // eslint-disable-next-line no-console
      console.error('error', err);
    }
  }

  next();
};

const isAuthUser = (res: Response) => {
  if (res.locals.user !== undefined && res.locals.user !== null) return true;
  else return false;
};

export const isAuthMiddleware = ( req: Request, res: Response, next: NextFunction) => {
  console.log('locals1', res.locals.user,  res.locals.cookies,  req.cookies);
  next();
  /*if (isAuthUser(res)) { 
    next();
  } else {
    res.status(401).send('not authorized');
  }
  */
}
