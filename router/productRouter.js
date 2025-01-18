import express from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

/**
 * @swagger
 * /api/products/get:
 *   get:
 *     summary: Получить список всех продуктов
 *     tags:
 *       - Продукты
 *     responses:
 *       200:
 *         description: Список всех продуктов
 */
router.get("/get", getProduct);

/**
 * @swagger
 * /api/products/post:
 *   post:
 *     summary: Добавить новый продукт
 *     tags:
 *       - Продукты
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
 *               price:
 *                 type: string
 *     responses:
 *       201:
 *         description: Продукт успешно добавлен
 */
router.post("/post", postProduct);

/**
 * @swagger
 * /api/products/put/{id}:
 *   put:
 *     summary: Обновить информацию о продукте
 *     tags:
 *       - Продукты
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID продукта
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
 *               price:
 *                 type: string
 *     responses:
 *       200:
 *         description: Продукт успешно обновлен
 *       404:
 *         description: Продукт не найден
 *       500:
 *         description: Ошибка сервера
 */
router.put("/put/:id", updateProduct);


/**
 * @swagger
 * /api/products/delete:
 *   delete:
 *     summary: Удалить продукт
 *     tags:
 *       - Продукты
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Продукт успешно удален
 */
router.delete("/delete/:id", deleteProduct);

export default router;
