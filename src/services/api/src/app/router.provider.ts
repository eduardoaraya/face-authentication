import { Router } from 'express';
import { RouterProviderInterface } from '../@types/app/app';
import AbstractRouter from './core/router.abstract';

export default class RouterProvider extends AbstractRouter implements RouterProviderInterface {
  getProvider(): RouterProviderInterface {
    return this;
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