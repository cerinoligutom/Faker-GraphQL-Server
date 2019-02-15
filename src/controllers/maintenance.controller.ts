import { Request, Response } from 'express';
import { BaseController } from './base.controller';

export class MaintenanceController extends BaseController {
  public healthCheck(req: Request, res: Response) {
    res.send({
      status: 'OK'
    });
  }
}
