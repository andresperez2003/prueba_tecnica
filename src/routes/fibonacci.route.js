import {Router} from 'express'
import { getFinabonacci,createFinabonacciDateAutomatic, createFinabonacciDateUser, getFinbonacciAutomatic, getFinbonacciManual} from '../controller/fibonacci.controller.js'


const router = Router()

/**
 * @swagger
 * /api/v1/fibonacci:
 *   get:
 *     summary: Retorna la lista de Fibonacci
 *     responses:
 *       200:
 *         description: Lista de Fibonacci
 *     tags:
 *       - Fibonacci    
 */
router.get('/fibonacci', getFinabonacci)

/**
 * @swagger
 * /api/v1/fibonacciAutomatic:
 *   get:
 *     summary: Retorna la lista de Fibonacci hecha automaticamente
 *     responses:
 *       200:
 *         description: Lista de Fibonacci hecha automaticamente
 *     tags:
 *       - Fibonacci    
 */
router.get('/fibonacciAutomatic', getFinbonacciAutomatic)

/**
 * @swagger
 * /api/v1/fibonacciManual:
 *   get:
 *     summary: Retorna la lista de Fibonacci hecha manualmente
 *     responses:
 *       200:
 *         description: Lista de Fibonacci hecha manualmente
 *     tags:
 *       - Fibonacci    
 */
router.get('/fibonacciManual', getFinbonacciManual)


/**
 * @swagger
 * /api/v1/FibonacciAutomatic:
 *   post:
 *     summary: Crea una serie de Fibonacci automatica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     tags:
 *       - Fibonacci
 *     responses:
 *       201:
 *         description: Serie fibonacci creada

 */
router.post('/fibonacciAutomatic', createFinabonacciDateAutomatic)

/**
 * @swagger
 * /api/v1/FibonacciUser:
 *   post:
 *     summary: Crea la serie de fibonacci con los numeros que pase el usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hours:
 *                 type: integer
 *                 description: Hora actual
 *               minutes:
 *                 type: integer
 *                 description: Minutos actuales
 *               seconds:
 *                 type: integer
 *                 description: Segundos actuales
 *     tags:
 *       - Fibonacci
 *     responses:
 *       201:
 *         description: Serie fibonacci creada

 */
router.post('/fibonacciUser', createFinabonacciDateUser)




export default router