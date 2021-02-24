import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'develop'
    ? '.env.develop'
    : '.env'
})

export default () => <{
  port: string,
  host: string,
  appName: string
}>({
  port: process.env.PORT,
  host: process.env.HOST,
  appName: process.env.APP_NAME,
})