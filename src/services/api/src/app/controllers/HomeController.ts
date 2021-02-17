import { Request, Response, Router } from 'express';
class HomeController {
  async index(req: Request, res: Response): Promise<void> {
    console.time();
    res.render('pages/home');
    console.timeEnd();
  }
  async signin(req: Request, res: Response): Promise<void> {
    console.time();
    res.render('pages/signin');
    console.timeEnd();
  }
  async signup(req: Request, res: Response): Promise<void> {
    console.time();
    res.render('pages/signup');
    console.timeEnd();
  }
}
export default new HomeController();