export default (router) => {
  router.get('/', 'HomeController@index');
  router.get('/signin', 'HomeController@signin');
  router.get('/signup', 'HomeController@signup');
}