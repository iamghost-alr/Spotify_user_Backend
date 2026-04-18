const express = require("express");
const multer = require("multer");
const router = express.Router();

const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authMiddleware.authArtist, upload.single("file"), musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/", authMiddleware.authUser, musicController.getMusic);
router.get("/album", authMiddleware.authUser, musicController.getAlbum);

module.exports = router;
