import { Router } from "express";
import { loginUser, registerUser } from "./controller";


const router: Router = Router()

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody: #@important to see body in ui.
 *       required: true
 *       description: User credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 format: email
 *                 example: Pritam Debnath
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
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/sign-up", registerUser)

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: User user
 *     tags: [Auth]
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
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/sign-in", loginUser)

export {router}