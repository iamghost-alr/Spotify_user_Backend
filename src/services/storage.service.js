const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(filePath) {
    try {
        const result = await imagekit.files.upload({
            file: filePath,
            fileName: "music_" + Date.now(),
            folder: "spotify-user-backend/music_uploads"
        });

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { uploadFile };