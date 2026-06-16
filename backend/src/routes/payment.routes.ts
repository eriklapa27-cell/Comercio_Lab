import { Router } from 'express';
import { paymentController } from '@/controllers/payment.controller';

const router: import("express").Router = Router();

router.post('/preference', paymentController.createPreference);
router.post('/webhook', paymentController.webhook);
router.get('/status/:paymentId', paymentController.getStatus);

export default router;
