import RouterProvider from "../../app/router.provider";
import { Router } from 'express';

export type RouterProvider = RouterProviderInterface;

interface RouterProviderInterface {
  get(path: string, handle: string): void;
  put(path: string, handle: string): void;
  delete(path: string, handle: string): void;
  post(path: string, handle: string): void;
  getRouters(): Router;
}