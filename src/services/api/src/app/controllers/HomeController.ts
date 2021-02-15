class HomeController {
  async index(req, res) {
    return res.render('pages/home', {});
  }
}

export default new HomeController();