import { RouterProvider } from "../@types/app/app";
export default (router: RouterProvider): void => {

  router.post('/api/user/create-acount', 'User/UserController@register');
}