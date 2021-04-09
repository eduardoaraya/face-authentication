import { Router } from 'express';
import api from '../../router/api';
import debug from 'debug';
import { RouterProviderInterface } from '../../@types/app/app';
import pathModule from 'path';
import App from '../app';
import { exec } from 'child_process';

const log = debug('face-auth:routers');

export default abstract class AbstractRouter {
  private router: Router;
  private registry: any = {};
  constructor(private app: App) {
    log('> Init router provider')
    this.router = Router();
    this.router.use((req, res, next) => {
      const { url, method, path } = req;
      const logText = `[${(new Date()).toLocaleString()}] ${method}::${app.getHost() + url}`;
      log(logText);
      exec(`echo "${logText}" >> $(pwd)/src/var/logs/router.log`,
        (err, data) => {
          if (err) return log('> Error to create log: ', err);
        }
      );
      if (this.registry[`${method}:${path}`] === undefined) {
        return res.render('errors/404', {});
      }
      next();
    });
    this.init(app);
  }
  private async init(app) {
    api(app)
  }
  protected async setRouter(
    methodRest: string,
    path: string,
    handle: string
  ): Promise<void> {
    if (!handle) {
      throw new Error('> Invalid handle router');
    }
    const [
      controller,
      method
    ] = handle.split('@');
    if (!controller || !method) {
      throw new Error('> Invalid controller or method: ' + handle);
    }
  }
}