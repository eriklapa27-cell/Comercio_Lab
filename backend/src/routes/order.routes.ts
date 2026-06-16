import { Router } from 'express';
import { orderController } from '@/controllers/order.controller';

const router: import("express").Router = Router();

/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: Gestión de pedidos
 */

/**
 * @openapi
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: Listar todos los pedidos (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', orderController.getAll);

/**
 * @openapi
 * /orders/me:
 *   get:
 *     tags: [Orders]
 *     summary: Mis pedidos (usuario autenticado)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos del usuario
 */
router.get('/me', orderController.getMyOrders);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Obtener pedido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del pedido
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', orderController.getById);

/**
 * @openapi
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Crear un pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               guest_email:
 *                 type: string
 *                 format: email
 *               coupon_code:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [box_id, quantity]
 *                   properties:
 *                     box_id:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *     responses:
 *       201:
 *         description: Pedido creado
 */
router.post('/', orderController.create);

/**
 * @openapi
 * /orders/{id}/status:
 *   patch:
 *     tags: [Orders]
 *     summary: Actualizar estado del pedido (admin)
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch('/:id/status', orderController.updateStatus);

export default router;
