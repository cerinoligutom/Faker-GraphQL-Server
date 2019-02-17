import { Request, Response } from 'express';
import { BaseController } from './base.controller';

export class MaintenanceController extends BaseController {
  public healthCheck(req: Request, res: Response) {
    res.send({
      status: 'OK'
    });
  }

  serverTime(req: Request, res: Response) {
    const now = new Date();
    res.send({
      utcTime: now.toUTCString(),
      localTime: now.toString(),
      ms: now.getTime(),
      iso: now.toISOString()
    });
  }
}
