import { Router } from 'express';
import boxRouter from './box.routes';
import couponRouter from './coupon.routes';
import orderRouter from './order.routes';
import userRouter from './user.routes';

export const router = Router();

router.use('/boxes', boxRouter);
router.use('/coupons', couponRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);
