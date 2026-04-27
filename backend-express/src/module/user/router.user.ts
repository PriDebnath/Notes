import { Router } from "express";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./controller.user";

const router: Router = Router()


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
 * /users/{_id}:
 *   get:
 *     summary: Get a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: _id # @Note the name is the same as in the url path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses: #@important to see response in ui.
 *       200:
 *         description: Item
 */
router.get('/:_id',getOne)

/**
 * @swagger
 * /users/{_id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: _id # @Note the name is the same as in the url path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
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
 *       200:
 *         description: List
 */
router.patch('/:_id',updateOne)


/**
 * @swagger
 * /users/{_id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: _id # @Note the name is the same as in the url path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses: #@important to see response in ui.
 *       200:
 *         description: Item
 */
router.delete('/:_id',deleteOne)

export  {router  } 