import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'develop'
    ? '.env.develop'
    : '.env'
})

export default (): {
  port: string,
  host: string,
  appName: string
} => ({
  port: process.env.PORT as string,
  host: process.env.HOST as string,
  appName: process.env.APP_NAME as string,
})