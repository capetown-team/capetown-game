import fs from 'fs';
import https from 'https';
import limiter from 'express-rate-limit';
import dotenv from 'dotenv';

import { isDev } from '../webpack/env';
import { app } from './server';
import { initDataBase } from './db/init/db_init';

dotenv.config();

const port = process.env.PORT || 5000;

app.use(
  limiter({
    windowMs: 15 * 60 * 10000,
    max: 20000,
    message: 'Слишком много запросов с одного IP'
  })
);

const certificateIsExist =
  fs.existsSync('server/certificate/key.pem') &&
  fs.existsSync('server/certificate/cert.pem');

if (isDev && certificateIsExist) {
  const server = https.createServer(
    {
      key: fs.readFileSync('server/certificate/key.pem'),
      cert: fs.readFileSync('server/certificate/cert.pem')
    },
    app
  );
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Open application on HTTPS local.ya-praktikum.tech:', port);
  });
} else {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port: ${port}`);
  });
}

initDataBase();
