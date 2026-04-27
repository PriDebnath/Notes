import { Router } from "express";
import { getAll } from "./controller.user";

const router: Router = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/',getAll)


export  {router  } 