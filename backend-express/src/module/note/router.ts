import { Router } from "express";
import { syncNote } from "./controller";
import { validatedJwtToken } from "../../middleware/jwt.middleware";


const router = Router()



/**
 * @swagger
 * /api/v1/notes/sync:
 *   post:
 *     summary: Notes
 *     tags: [Notes]
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
router.post("/sync", validatedJwtToken, syncNote)

export   {router}