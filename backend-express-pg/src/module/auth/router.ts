import { Router } from "express";
import { signInController, signUpController } from "./controller";
import { validateJwt } from "../../../src/middleware/validate-jwt";

const router =  Router()

/**
 * @swagger
 *   /api/v1/auth/sign-up:
 *   post:
 *     tags: [Auth]
 *     requestBody: #@important to see body in ui.
 *       required: true
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
 *       200:
 *         description: success
 */
router.post("/sign-up", signUpController )


/**
 * @swagger
 *   /api/v1/auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     requestBody: #@important to see body in ui.
 *       required: true
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
 *       200:
 *         description: success
 */
router.post("/sign-in", signInController )

export { router }