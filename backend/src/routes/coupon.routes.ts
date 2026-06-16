import { Router } from 'express';
import { couponController } from '@/controllers/coupon.controller';

const router: import("express").Router = Router();

/**
 * @openapi
 * tags:
 *   name: Coupons
 *   description: Campañas de cupones de influencers
 */

/**
 * @openapi
 * /coupons:
 *   get:
 *     tags: [Coupons]
 *     summary: Listar todas las campañas (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de campañas de cupones
 */
router.get('/', couponController.getAll);

/**
 * @openapi
 * /coupons/{code}:
 *   get:
 *     tags: [Coupons]
 *     summary: Validar y obtener cupón por código
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del cupón (ej. INFLUENCER10)
 *     responses:
 *       200:
 *         description: Datos del cupón
 *       404:
 *         description: Cupón no encontrado o expirado
 */
router.get('/:code', couponController.getByCode);

/**
 * @openapi
 * /coupons:
 *   post:
 *     tags: [Coupons]
 *     summary: Crear una campaña de cupón (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, influencer_name, discount_pct, max_uses, valid_from, valid_until]
 *             properties:
 *               code:
 *                 type: string
 *               influencer_name:
 *                 type: string
 *               discount_pct:
 *                 type: number
 *               max_uses:
 *                 type: integer
 *               applicable_box_id:
 *                 type: string
 *               valid_from:
 *                 type: string
 *                 format: date-time
 *               valid_until:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Campaña creada
 */
router.post('/', couponController.create);

/**
 * @openapi
 * /coupons/{id}:
 *   put:
 *     tags: [Coupons]
 *     summary: Actualizar una campaña (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_active:
 *                 type: boolean
 *               max_uses:
 *                 type: integer
 *               valid_until:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Campaña actualizada
 */
router.put('/:id', couponController.update);

/**
 * @openapi
 * /coupons/{id}:
 *   delete:
 *     tags: [Coupons]
 *     summary: Eliminar una campaña (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Campaña eliminada
 */
router.delete('/:id', couponController.remove);

export default router;
