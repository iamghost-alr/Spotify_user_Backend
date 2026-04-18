const musicModel = require("../model/music.model");
const albumModel = require("../model/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
    try {
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
            artist: req.user.id
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

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function getMusic(req, res) {
    try {
        const music = await musicModel
            .find()
            .limit(10)
            .populate("artist", "username");
        return res.status(200).json({
            message: "Music fetched successfully",
            data: music
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function getAlbum(req, res) {
    try {
        const album = await albumModel.find().populate("musics", "title");
        return res.status(200).json({
            message: "Album fetched successfully",
            data: album
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = { createMusic, createAlbum, getMusic, getAlbum };