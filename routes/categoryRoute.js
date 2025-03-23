const { createCategory, getAllCategoryy, getOneCategory } = require("../controllers/categoryController")
const { authenticate } = require("../middleware/authentication")

const router = require("express").Router()

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     description: This route is used to create a new product category. Only authenticated users can perform this action.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: New category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New Category Added
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Electronics
 *       400:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *
 * /api/v1/allCategories:
 *   get:
 *     summary: Retrieve all categories
 *     description: This route fetches all available categories. Only authenticated users can perform this action.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All Categories Available
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60c72b2f4f1a4e3a8c62b12d
 *                       name:
 *                         type: string
 *                         example: Electronics
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *
 * /api/v1/category/{categoryId}:
 *   get:
 *     summary: Get a single category
 *     description: Fetch details of a single category by its ID. Only authenticated users can perform this action.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Retrieved Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60c72b2f4f1a4e3a8c62b12d
 *                     name:
 *                       type: string
 *                       example: Electronics
 *                     productIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 60c72b2f4f1a4e3a8c62b12e
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.post("/category", authenticate, createCategory);

router.get("/allCategories", authenticate, getAllCategoryy)

router.get("/category/:categoryId", authenticate, getOneCategory)


module.exports = router