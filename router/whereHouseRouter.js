import express from "express";
import { getWherehouse, postWherehouse, putWherehouse, deleteWherehouse } from '../controller/wherehouseController.js';


const router = express.Router();

/**
 * @swagger
 * /api/wherehouse/get:
 *   get:
 *     summary: Получить список всех складов
 *     tags:
 *       - Склады
 *     responses:
 *       200:
 *         description: Список всех складов
 */
/**
 * @swagger
 * /api/wherehouse/post:
 *   post:
 *     summary: Добавить новый склад
 *     tags:
 *       - Склады
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Склад успешно добавлен
 */
/**
 * @swagger
 * /api/wherehouse/put:
 *   put:
 *     summary: Обновить информацию о склады
 *     tags:
 *       - Склады
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Склад успешно обновлен
 */
/**
 * @swagger
 * /api/wherehouse/delete:
 *   delete:
 *     summary: Удалить склад
 *     tags:
 *       - Склады
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Склад успешно удален
 */
router.get("/get", getWherehouse);
router.post("/post", postWherehouse);
router.put("/put/:id", putWherehouse);
router.delete("/delete/:id", deleteWherehouse);

export default router;
