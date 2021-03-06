import { Request, Response, Router } from 'express';
class HomeController {
  async index(req: Request, res: Response): Promise<void> {
    res.render('pages/home');
  }
  async signin(req: Request, res: Response): Promise<void> {
    res.render('pages/signin');
  }
  async signup(req: Request, res: Response): Promise<void> {
    res.render('pages/signup');
  }
}
export default new HomeController();