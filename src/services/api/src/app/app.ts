import express, { Express } from 'express';
import { Server } from 'http';
import debug from 'debug';
import bodyParser from 'body-parser';
import reactViews from 'express-react-views';

const log = debug('face-auth:app');

type AppType = {
  readonly port: number,
  readonly routes: string
}
export default class App<AppType> {
  private server: Server | undefined;
  private app: Express;
  constructor(
    private readonly PORT,
    private readonly routes,
    private readonly host
  ) {
    this.app = express();
  }
  public async init() {
    await this.initMiddlewares();
    await this.setViewEngine();
    await this.startServer();
  }
  private async startServer(): Promise<Server> {
    this.server = <Server>this.app.listen(this.PORT, () => {
      log('> Server on port: ', this.PORT)
    });
    return this.server;
  }
  private async initMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }
  private async setViewEngine() {
    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'tsx');
    this.app.engine('tsx', reactViews.createEngine());
  }
}