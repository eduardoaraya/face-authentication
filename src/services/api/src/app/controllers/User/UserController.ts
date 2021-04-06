import { Request, Response, Router } from 'express';
class UserController {
  public async register(req, res) {
    res.json({ teste: 'teste' });
  }
}
export default new UserController();