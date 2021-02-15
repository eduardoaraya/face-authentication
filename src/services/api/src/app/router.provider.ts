import { Router } from 'express';
import api from './router/api';
import debug from 'debug';
import pathModule from 'path';

const log = debug('face-auth:routers');

export default class RouterProvider<T> {
  private router: Router;
  private registry: any = {};
  constructor(private app) {
    log('> Init router provider')
    this.router = Router();
    this.router.use((req, res, next) => {
      const { url, method, path } = req;
      log('> New call in router:', url)
      if (this.registry[`${method}:${path}`] === undefined) {
        return res.render('errors/404', {});
      }
      next();
    });
    this.init();
  }
  private async init() {
    api(this)
  }
  public get(path, handle) {
    return this.setRouter('get', path, handle);
  }
  public post(path, handle) {
    return this.setRouter('post', path, handle);
  }
  public put(path, handle) {
    return this.setRouter('put', path, handle);
  }
  public delete(path, handle) {
    return this.setRouter('delete', path, handle);
  }
  private async setRouter(methodRest: string, path: string, handle: string = '') {
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
      pathModule.join(__dirname, 'controllers', controller)
    );
    this.registry[`${methodRest.toUpperCase()}:${path}`] = HandleController.default[method];
    this.router[methodRest](path, HandleController.default[method]);
  }
  getRouters(): Router {
    return this.router;
  }
}