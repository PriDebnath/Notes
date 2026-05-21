import { Router } from "express";
import { practiceTransaction, practiceCache } from "./controller";

const router: Router = Router()

/**
 * @swagger
 * /api/v1/practice/transaction:
 *   get:
 *     tags: [Practice]
 *     responses: #@important to see response in ui.
 *       201:
 *         description: success
 *       400:
 *         description: Invalid input
 */
router.get("/transaction", practiceTransaction)
/**
 * @swagger
 * /api/v1/practice/cache:
 *   get:
 *     tags: [Practice]
 *     responses: #@important to see response in ui.
 *       201:
 *         description: success
 *       400:
 *         description: Invalid input
 *     
 */
router.get('/cache', practiceCache)

export {router}