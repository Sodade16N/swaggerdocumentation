const { addProduct, getAllProducts, getOneProduct, getProductsByCategory, deleteProduct } = require("../controllers/productController.js")
const { authenticate, adminAuth } = require("../middleware/authentication.js")

const router = require("express").Router()

const upload = require("../utils/multer.js")

/** 
 * @swagger
 * /api/v1/product/{categoryId}:
 *   post:
 *     summary: Add a new product to a specific category (Admin only).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category to which the product belongs.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the product.
 *                 example: A great product.
 *               price:
 *                 type: number
 *                 description: Price of the product.
 *                 example: 19.99
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: Image of the product.
 *     responses:
 *       201:
 *         description: New Product Added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New Product Added
 *                 productDetails:
 *                   type: object
 *                   description: Details of the newly added product.
 *       404:
 *         description: User or Category Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 * 
 * /api/v1/allProducts:
 *   get:
 *     summary: Get all products (Authenticated users only).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All Products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All Products
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Product details.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 * 
 * /api/v1/product/{productId}:
 *   get:
 *     summary: Get details of a single product by ID (Authenticated users only).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product Retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Products Retrieved
 *                 data:
 *                   type: object
 *                   description: Details of the product.
 *       404:
 *         description: Product Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 * 
 * /api/v1/product/delete/{productId}/{categoryId}:
 *   delete:
 *     summary: Delete a product by ID and remove it from its category (Admin only).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category the product belongs to.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       404:
 *         description: Product or Category Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post("/product/:categoryId", adminAuth, upload.single("productImage"),addProduct)

router.get("/allProducts", authenticate, upload.single("productImage"),getAllProducts)

router.get("/product/:productId", authenticate, upload.single("productImage"),getOneProduct);

router.delete("/product/delete/:productId/:categoryId", adminAuth,upload.single("productImage"), deleteProduct)

module.exports = router