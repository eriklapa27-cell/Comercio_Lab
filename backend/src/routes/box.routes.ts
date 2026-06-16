import { Router } from 'express';
import { boxController } from '@/controllers/box.controller';

const router: import("express").Router = Router();

/**
 * @openapi
 * tags:
 *   name: Boxes
 *   description: Catálogo de mystery boxes
 */

/**
 * @openapi
 * /boxes:
 *   get:
 *     tags: [Boxes]
 *     summary: Listar todas las cajas activas
 *     responses:
 *       200:
 *         description: Lista de cajas
 */
router.get('/', boxController.getAll);

/**
 * @openapi
 * /boxes/{id}:
 *   get:
 *     tags: [Boxes]
 *     summary: Obtener una caja por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de la caja
 *       404:
 *         description: Caja no encontrada
 */
router.get('/:id', boxController.getById);

/**
 * @openapi
 * /boxes:
 *   post:
 *     tags: [Boxes]
 *     summary: Crear una nueva caja (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, theme, rarity]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image_url:
 *                 type: string
 *               theme:
 *                 type: string
 *               rarity:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caja creada
 *       401:
 *         description: No autorizado
 */
router.post('/', boxController.create);

/**
 * @openapi
 * /boxes/{id}:
 *   put:
 *     tags: [Boxes]
 *     summary: Actualizar una caja (admin)
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Caja actualizada
 *       404:
 *         description: Caja no encontrada
 */
router.put('/:id', boxController.update);

/**
 * @openapi
 * /boxes/{id}:
 *   delete:
 *     tags: [Boxes]
 *     summary: Eliminar una caja (admin)
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
 *         description: Caja eliminada
 *       404:
 *         description: Caja no encontrada
 */
router.delete('/:id', boxController.remove);

export default router;
