import RouterProvider from "../../app/router.provider";
import { Router } from 'express';

export type RouterProvider = RouterProviderInterface;

interface RouterProviderInterface {
  get(path: string, handle: string | Function): void;
  put(path: string, handle: string | Function): void;
  delete(path: string, handle: string | Function): void;
  post(path: string, handle: string | Function): void;
  getRouters(): Router;
}