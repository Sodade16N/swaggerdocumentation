const { addToCart, getcart, reduceProductQuantity, clearCart, deleteProductFromCart } = require("../controllers/cartController");
const { authenticate } = require("../middleware/authentication");

const router = require("express").Router()

/**
 * @swagger
 * /api/v1/cart/{productId}:
 *   post:
 *     summary: Add a product to the user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to add to the cart.
 *     responses:
 *       201:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Products added to cart
 *                 data:
 *                   type: object
 *                   description: Updated cart details.
 *       404:
 *         description: User or product not found.
 *       500:
 *         description: Internal Server Error.
 * 
 * /api/v1/allCart:
 *   get:
 *     summary: Retrieve all products in the user's cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all products in the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All Products in the cart
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal Server Error.
 * 
 * /api/v1/cart/reduce/{productId}:
 *   patch:
 *     summary: Reduce the quantity of a product in the user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to reduce the quantity for.
 *     responses:
 *       200:
 *         description: Successfully reduced product quantity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product quantity reduced
 *                 data:
 *                   type: object
 *                   description: Updated cart details.
 *       404:
 *         description: User, product, or cart not found.
 *       500:
 *         description: Internal Server Error.
 * 
 * /api/v1/cart/delete/{productId}:
 *   delete:
 *     summary: Remove a specific product from the user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from the cart.
 *     responses:
 *       200:
 *         description: Successfully removed product from cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed from cart
 *                 data:
 *                   type: object
 *                   description: Updated cart details.
 *       404:
 *         description: User, product, or cart not found.
 *       500:
 *         description: Internal Server Error.
 * 
 * /api/v1/clearCart:
 *   delete:
 *     summary: Clear all products from the user's cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully cleared the cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart deleted successfully
 *                 data:
 *                   type: object
 *                   description: Cleared cart details.
 *       404:
 *         description: User or cart not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/cart/:productId", authenticate, addToCart);

router.get("/allCart", authenticate, getcart)

router.patch("/cart/reduce/:productId", authenticate, reduceProductQuantity)

router.delete("/cart/delete/:productId", authenticate, deleteProductFromCart)

router.delete("/clearCart", authenticate, clearCart)


module.exports = router