const express = require('express')
const { registerUser, loginUser, verifyUser, forgotPassword, resetUserPassword, registerAdmin} = require('../controllers/userController')
const { authenticate, adminAuth} = require('../middleware/authentication');
const { registerUserValidator, loginValidator } = require('../middleware/validator');

const router = express.Router();

/**
 * @swagger
 * /api/v1/admin/register:
 *   post:
 *     summary: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the admin
 *                 example: "Sodade Daniella"
 *               email:
 *                 type: string
 *                 description: The email of the admin
 *                 example: "admin@sample.com"
 *               password:
 *                 type: string
 *                 description: The password for the admin
 *                 example: "Admin123$"
 *               confirmPassword:
 *                 type: string
 *                 description: Must match the password
 *                 example: "Admin123$"
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Passwords do not match / Admin with this email already exists
 *       500:
 *         description: Internal server error
 *
 * /api/v1/admin:
 *   post:
 *     summary: Create an admin (requires admin authorization)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the admin
 *                 example: "Sodade Daniella"
 *               email:
 *                 type: string
 *                 description: The email of the admin
 *                 example: "admin@sample.com"
 *               password:
 *                 type: string
 *                 description: The password for the admin
 *                 example: "Admin123$"
 *               confirmPassword:
 *                 type: string
 *                 description: Must match the password
 *                 example: "Admin123$"
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Passwords do not match / Admin with this email already exists
 *       500:
 *         description: Internal server error
 *
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *                 example: "Sodade Daniella"
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: "daniella@sample.com"
 *               password:
 *                 type: string
 *                 description: The password for the user
 *                 example: "User123$"
 *               confirmPassword:
 *                 type: string
 *                 description: Must match the password
 *                 example: "User123$"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Passwords do not match / User with this email already exists
 *       500:
 *         description: Internal server error
 *
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: "daniella@sample.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "User123$"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Incorrect password / Missing credentials
 *       500:
 *         description: Internal server error
 *
 * /api/v1/verify/user/{token}:
 *   get:
 *     summary: Verify a user's account using a token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The verification token sent to the user's email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account verified successfully
 *       400:
 *         description: Account already verified
 *       404:
 *         description: Token not found / Account not found
 *       500:
 *         description: Internal server error
 *
 * /api/v1/forgot_password/user:
 *   post:
 *     summary: Send a password reset link to the user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "daniella@sample.com"
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 *
 * /api/v1/reset_password/user/{token}:
 *   post:
 *     summary: Reset the user's password
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The reset token sent to the user's email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user
 *                 example: "NewPassword123$"
 *               confirmPassword:
 *                 type: string
 *                 description: Must match the new password
 *                 example: "NewPassword123$"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Passwords do not match
 *       404:
 *         description: Token not found / Account not found
 *       500:
 *         description: Internal server error
 */
router.post("/admin/register", registerUserValidator, registerAdmin) 

router.post("/admin",adminAuth, registerAdmin)
router.post('/register',registerUserValidator,registerUser);
router.post('/login',loginValidator, loginUser);
router.get('/verify/user/:token', verifyUser);
router.post('/forgot_password/user', forgotPassword);
router.post('/reset_password/user/:token', resetUserPassword);


module.exports = router;
