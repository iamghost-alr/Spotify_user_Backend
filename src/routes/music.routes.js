const express = require("express");
const multer = require("multer");
const router = express.Router();

const musicController = require("../controllers/music.controller");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), musicController.createMusic);

module.exports = router;

