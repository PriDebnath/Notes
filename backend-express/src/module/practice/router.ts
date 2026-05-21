import { Router } from "express";
import { practiceTransaction } from "./controller";



const router: Router = Router()

/**
 * @swagger
 * /api/v1/practice/transaction:
 *   get:
 *     summary: transaction  
 *     tags: [Practice]
 *     responses: #@important to see response in ui.
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.get("/transaction", practiceTransaction)

export {router}