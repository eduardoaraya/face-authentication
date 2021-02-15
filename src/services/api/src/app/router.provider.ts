import { Router } from 'express';
import api from './router/api';
import debug from 'debug';

const log = debug('face-auth:routers');

export default class RouterProvider<T> {
  private router: Router;
  constructor(private app) {
    log('> Init router provider')
    this.router = Router();
    this.router.use((req, res, next) => {
      log('> New call in router:', req.url)
      next();
    });
    this.init();
  }
  private async init() {
    api(this.router)
  }
  private async match(path: string, handle: string) {

  }
  getRouters(): Router {
    return this.router;
  }
}