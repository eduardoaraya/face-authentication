import express, { Express } from 'express';
import { Server } from 'http';
import debug from 'debug';
import bodyParser from 'body-parser';
import reactViews from 'express-react-views';

const log = debug('face-auth:app');

export default class App<T> {
  private server: Server | undefined;
  private app: Express;
  constructor(
    private readonly port,
    private readonly host,
    private readonly appName,
    private routes
  ) {
    this.app = express();
    this.routes = new this.routes(this)
  }
  public async init() {
    await this.initMiddlewares();
    await this.setViewEngine();
    await this.startServer();
  }
  private async startServer(): Promise<Server> {
    this.server = this.app.listen(this.port, () => {
      log('> Server on port: ', this.port)
    });
    return this.server;
  }
  private async initMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(this.routes.getRouters());
  }
  private async setViewEngine() {
    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'tsx');
    this.app.engine('tsx', reactViews.createEngine());
  }
}