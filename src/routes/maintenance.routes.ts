import { MaintenanceController } from '@app/controllers';
import express from 'express';

const maintenanceController = new MaintenanceController();

const router = express.Router();

router.get('/health-check', maintenanceController.healthCheck);
router.get('/server-time', maintenanceController.serverTime);

export const maintenanceRouter = router;
