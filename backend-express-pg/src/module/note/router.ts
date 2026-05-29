import { Router } from "express";
import { addNoteController } from "./controller";
import { validateJwt } from "../../../src/middleware/validate-jwt";

const router =  Router()

/**
 * @swagger
 *   /api/v1/notes/:
 *   post:
 *     tags: [Notes]
 *     requestBody: #@important to see body in ui.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: text
 *     responses: #@important to see response in ui.
 *       200:
 *         description: success
 */
router.post("/", validateJwt, addNoteController )

export { router }