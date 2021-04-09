import express, { Express } from 'express';
import { Server } from 'http';
import debug from 'debug';
import reactViews from 'express-react-views';
import path from 'path';
import RouterProvider from './router.provider';
import appConfig from '../configs/app.config';

const log = debug('face-auth:app');
export default class App {
  private server: Server | undefined;
  private app: Express;
  private router: RouterProvider;
  private port: string;
  private host: string;
  private appName: string;
  constructor() {
    this.app = express();
    this.port = appConfig().port;
    this.appName = appConfig().appName;
    this.host = appConfig().host;
    this.router = new RouterProvider(this)
  }
  public async init() {
    await this.initMiddlewares();
    await this.setViewEngine();
    await this.startServer();
  }
  private async startServer(): Promise<Server> {
    this.server = this.app.listen(this.port, () => {
      log('> Server on port: ', `${this.host}:${this.port}`);
    });
    return this.server;
  }
  private async initMiddlewares() {
    this.app.use(express.static(path.join(__dirname, '..', 'assets', 'public')))
    this.app.use(this.router.getRouters());
  }
  private async setViewEngine() {
    this.app.set('views', path.join(__dirname, '..', 'views'));
    this.app.set('view engine', 'tsx');
    this.app.engine('tsx', reactViews.createEngine());
  }
  public getAppName() {
    return this.appName;
  }
  public getHost() {
    return this.host;
  }
  public getExpress() {
    return this.app;
  }
}