import { Router } from "express";
import { createOne, getAll } from "./controller.user";

const router: Router = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses: #@important to see response in ui.
 *       200:
 *         description: List
 */
router.get('/',getAll)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody: #@important to see body in ui.
 *       required: true
 *       description: User credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: debnathpritam0802@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses: #@important to see response in ui.
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createOne);

export  {router  } 