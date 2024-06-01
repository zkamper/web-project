const Image = require('../models/sign_model');
const handleResponse = require("../utils/handleResponse");
const getSectionTitle = require("../utils/getSectionTitle");

const getImageBySection = async (res, req, section) => {
    try {
        const images = await Image.find({ section: section });
        if (images.length === 0) {
            handleResponse(res, 404, { error: "No images found" });
            return;
        }
        handleResponse(res, 200, {
            title: getSectionTitle(section),
            images: images
        })
    } catch (error) {
        console.log(error);
        handleResponse(res, 500, { error: "Error fetching images" });
    }
}

module.exports = {
    getImageBySection
}