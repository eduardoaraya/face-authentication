import { RouterProvider } from "../@types/app/app";

export default (router: RouterProvider): void => {
  router.get('/routes', async (req, res, app) => {
    res.json(app.getRegistry());
  });
  router.get('/', 'HomeController@index');
  router.get('/signin', 'HomeController@signin');
  router.get('/signup', 'HomeController@signup');
}