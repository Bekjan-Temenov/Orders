import express from "express";
import {getSales ,  postSales , putSales ,deleteSales , getSaleById  } from "../controller/salesController.js"

const router =  express.Router();
/**
 * @swagger
 * /api/sales/get:
 *   get:
 *     summary: Получить список всех продаж
 *     tags:
 *       - Продажи
 *     responses:
 *       200:
 *         description: Список всех продаж  
 */
/**
 * @swagger
 * /api/sales/post:
 *   post:
 *     summary: Добавить новую продажу
 *     tags:
 *       - Продажи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wherehouses_id:
 *                 type: integer
 *                 description: Идентификатор склада, на который относится продажа
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Дата продажи в формате ISO 8601 (например, "2025-01-01T10:00:00Z")
 *               total:
 *                 type: number
 *                 format: float
 *                 description: Общая сумма продажи. Должна быть рассчитана клиентом.
 *               items:
 *                 type: array
 *                 description: Список товаров, включённых в продажу
 *                 items:
 *                   type: object
 *                   properties:
 *                     products_id:
 *                       type: integer
 *                       description: Идентификатор товара
 *                     quantity:
 *                       type: integer
 *                       description: Количество проданных единиц товара
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Цена за единицу товара
 *     responses:
 *       200:
 *         description: Продажа успешно добавлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Идентификатор созданной продажи
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Дата продажи
 *                 wherehouses_id:
 *                   type: integer
 *                   description: Идентификатор склада
 *                 total:
 *                   type: number
 *                   format: float
 *                   description: Общая сумма продажи
 *       400:
 *         description: Неверный запрос. Проверьте корректность данных.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

/**
 * @swagger
 * /api/sales/put/{id}:
 *   put:
 *     summary: Обновить информацию о продаже
 *     tags:
 *       - Продажи
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор продажи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wherehouses_id
 *               - date
 *               - total
 *               - items
 *             properties:
 *               wherehouses_id:
 *                 type: integer
 *                 description: Идентификатор склада
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Дата продажи
 *               total:
 *                 type: integer
 *                 description: Общая сумма продажи
 *               items:
 *                 type: array
 *                 description: Список товаров в продаже
 *                 items:
 *                   type: object
 *                   required:
 *                     - products_id
 *                     - quantity
 *                     - price
 *                   properties:
 *                     products_id:
 *                       type: integer
 *                       description: Идентификатор товара
 *                     quantity:
 *                       type: integer
 *                       description: Количество товара
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Цена товара
 *     responses:
 *       200:
 *         description: Продажа успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Продажа успешно обновлена
 *                 data:
 *                   type: object
 *                   description: Обновленные данные продажи
 *       400:
 *         description: Неверные данные в запросе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Неверные данные в запросе
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ошибка сервера
 */


/**
 * @swagger
 * /api/sales/delete/{id}:
 *   delete:
 *     summary: Удалить продажу
 *     tags:
 *       - Продажи
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID продажи
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Продажа успешно удалена 
 */
/**
 * @swagger
 * /api/sales/get/{id}:
 *   get:
 *     summary: Получить продажу по ID
 *     tags:
 *       - Продажи
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID продажи
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Продажа успешно получена        
 */
router.get("/get" , getSales);
router.post("/post" , postSales);
router.put("/put/:id" , putSales);
router.delete("/delete/:id" , deleteSales);
router.get("/get/:id" , getSaleById);
export default router