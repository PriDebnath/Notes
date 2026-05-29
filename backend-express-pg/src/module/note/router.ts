import { Router } from "express";
import { addNoteController, getNotesController, updateNoteController } from "./controller";
import { validateJwt } from "../../../src/middleware/validate-jwt";

const router =  Router()

/**
 * @swagger
 *   /api/v1/notes/:
 *   get:
 *     tags: [Notes]
 *     responses: #@important to see response in ui.
 *       200:
 *         description: success
 */
router.get("/", validateJwt, getNotesController )

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

/**
 * @swagger
 *   /api/v1/notes/{id}:
 *   patch:
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
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
router.patch("/:id", validateJwt, updateNoteController )

export { router }