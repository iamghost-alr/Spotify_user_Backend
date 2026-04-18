const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authMiddleware.authArtist, authController.registerUser);
router.post("/login", authMiddleware.authArtist, authController.loginUser);
router.post("/logout", authMiddleware.authArtist, authController.logoutUser);

module.exports = router;