const musicModel = require("../model/music.model");
const albumModel = require("../model/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token is required"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken.role !== "artist") {
            return res.status(403).json({
                message: "Only artists can create music"
            });
        }

        const { title } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        const uploadResult = await uploadFile(
            file.buffer.toString("base64")
        );

        const music = await musicModel.create({
            title,
            uri: uploadResult.url,
            artist: decodedToken.id
        });

        return res.status(201).json({
            message: "Music created successfully",
            data: music
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function createAlbum(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Token is required"
            });
        }

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            if (decodedToken.role !== "artist") {
                return res.status(403).json({
                    message: "Only artists can create album"
                });
            }

            const { title, music } = req.body;

            const musics = await musicModel.find({
                _id: { $in: music }
            });

            if (!title) {
                return res.status(400).json({
                    message: "Title is required"
                });
            }

            if (!musics.length) {
                return res.status(400).json({
                    message: "No valid music found"
                });
            }

            const album = await albumModel.create({
                title,
                musics
            });

            return res.status(201).json({
                message: "Album created successfully",
                data: album
            });

        } catch (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = { createMusic, createAlbum };
