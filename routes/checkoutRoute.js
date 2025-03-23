const { initializePyment, checkout } = require("../controllers/checkoutController")
const { authenticate } = require("../middleware/authentication")

const router = require("express").Router()

/**
 * @swagger
 * /payment/initialize:
 *   post:
 *     summary: Initialize a payment for the user's cart.
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Payment initialized successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment Initialized Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     authorization_url:
 *                       type: string
 *                       example: https://checkout.paystack.com/example
 *                     reference:
 *                       type: string
 *                       example: 9H85GELE
 *                 transactionDetails:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 5000
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     reference:
 *                       type: string
 *                       example: 9H85GELE
 *                     paymentDate:
 *                       type: string
 *                       example: 3/23/2025, 12:30:45 PM
 *       404:
 *         description: User or cart not found.
 *       500:
 *         description: Error initializing payment.
 *
 * /checkout:
 *   post:
 *     summary: Complete a checkout process for the user's cart.
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: reference
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment reference to verify.
 *     responses:
 *       200:
 *         description: Checkout completed successfully or payment failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Checkout Successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: Success
 *                     reference:
 *                       type: string
 *                       example: 9H85GELE
 *       404:
 *         description: User or cart not found.
 *       500:
 *         description: Error during checkout.
 */

router.post("/payment/initialize", authenticate, initializePyment)

router.post("/checkout", authenticate, checkout)


module.exports = router