import { Handler, Router } from 'express';
import debug from 'debug';
import pathModule from 'path';
import { RouterProviderInterface } from '../@types/app/app';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const log = debug('face-auth:routers');

class Controller {
  constructor(
    private app,
    private _handle: Function | string,
  ) {
  }
  private isCallback() {
    return typeof this._handle === 'function';
  }
  private getHandleCallback(): Handler {
    return (req, res, next) => {
      const handle: Function = this._handle as Function;
      return handle(req, res, {
        App: this.app,
        next
      });
    }
  }
  private async getController(_handle: string): Promise<any> {
    const [
      controller,
      method
    ] = _handle.split('@');
    if (!controller) {
      throw new Error(
        `> Invalid controller:  ${controller}`
      );
    }
    const path = pathModule.join(
      __dirname,
      'controllers',
      ...controller.split('/')
    );
    const { default: moduleControll }: { default: any } = await import(path);
    return (req, res, next) => moduleControll[method](req, res, {
      app: this.app,
      next
    });
  }
  public async build() {
    if (this.isCallback())
      return this.getHandleCallback();
    return await this.getHandleController();
  }
  private async getHandleController() {
    return this.getController(this._handle.toString());
  }
}

export default class RouterProvider<T> implements RouterProviderInterface {
  private router: Router;
  private registry: any = {};
  constructor(private app) {
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
    service: string | Function
  ): Promise<void> {
    const controller = await (new Controller(this.app, service));
    const handle = await controller.build();
    this.registry[`${methodRest.toUpperCase()}:${path}`] = handle.toString();
    this.router[methodRest](path, handle);
  }
  public getRegistry() {
    return this.registry;
  }
  private async init() {
    const modulesPath = path.join(__dirname, '..', '..', 'src', 'router');
    const routes = fs.readdirSync(modulesPath);
    for (const moduleName of routes) {
      const module = await import(path.join(modulesPath, moduleName));
      module.default(this);
    }
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