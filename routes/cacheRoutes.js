const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cacheController');

/**
 * @swagger
 * tags:
 *   name: VirusTotal
 *   description: Запросы к VirusTotal API
 */

/**
 * @swagger
 * tags:
 *   name: Cache
 *   description: API для работы с кешем
 */

/**
 * @swagger
 * /api/cache/files/{id}:
 *   get:
 *     summary: Получить информацию о файле из кеша или внешнего API
 *     tags: [VirusTotal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SHA-256, SHA-1 or MD5 identifying the file
 *     responses:
 *       200:
 *         description: Данные получены успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/cache/files/:id', cacheController.getFileData);

/**
 * @swagger
 * /api/cache/urls:
 *   get:
 *     summary: Получить информацию об URL из кеша или внешнего API
 *     tags: [VirusTotal]
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: URL adress
 *     responses:
 *       200:
 *         description: Данные получены успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/cache/urls', cacheController.getUrlData);

/**
 * @swagger
 * /api/cache/{type}/{id}:
 *   post:
 *     summary: Добавить данные в кеш
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [files, urls]
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
 *               value:
 *                 type: object
 *     responses:
 *       201:
 *         description: Данные успешно добавлены
 */
router.post('/cache/:type/:id', cacheController.setData);

/**
 * @swagger
 * /api/cache:
 *   delete:
 *     summary: Очистить кеш
 *     tags: [Cache]
 *     responses:
 *       204:
 *         description: Кеш успешно очищен
 */
router.delete('/cache', cacheController.clearCache);

/**
 * @swagger
 * /api/cache/size:
 *   post:
 *     summary: Изменить размер кеша
 *     tags: [Cache]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Размер кеша успешно изменен
 */
router.post('/cache/size', cacheController.setCacheSize);

module.exports = router;