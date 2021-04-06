import { Router } from 'express';
import api from '../router/api';
import debug from 'debug';
import pathModule from 'path';
import { RouterProviderInterface } from '../@types/app/app';
<<<<<<< HEAD
import App from './app';
=======
import { exec } from 'child_process';
>>>>>>> f8899611e7036f4045247b79e4531b73a2b1bd14

const log = debug('face-auth:routers');

export default class RouterProvider implements RouterProviderInterface {
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
    this.init();
  }
  private async setRouter(
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
    const HandleController = await import(
      pathModule.join(
        __dirname,
        'controllers',
        ...controller.split('/')
      )
    );
    this.registry[`${methodRest.toUpperCase()}:${path}`] = HandleController.default[method];
    this.router[methodRest](path, HandleController.default[method]);
  }
  private async init() {
    api(this)
  }
  get(path, handle) {
    return this.setRouter('get', path, handle);
  }
  post(path, handle) {
    return this.setRouter('post', path, handle);
  }
  put(path, handle) {
    return this.setRouter('put', path, handle);
  }
  delete(path, handle) {
    return this.setRouter('delete', path, handle);
  }
  getRouters(): Router {
    return this.router;
  }
}