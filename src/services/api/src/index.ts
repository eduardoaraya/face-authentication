import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'develop'
    ? '.env.develop'
    : '.env'
})

import App from './app/app';
import RouterProvider from './app/router.provider'

const app = new App(
  process.env.PORT,
  process.env.HOST,
  process.env.APP_NAME,
  RouterProvider
);

app.init();


