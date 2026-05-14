import { Router } from "express";
import { practiceTransaction } from "./controller";



const router: Router = Router()

/**
 * @swagger
 * /api/v1/auth/practiceTransaction:
 *   get:
 *     summary: practiceTransaction  
 *     tags: [Auth]
 *     responses: #@important to see response in ui.
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.get("/tansaction", practiceTransaction)

export {router}