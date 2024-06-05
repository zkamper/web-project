const Image = require('../models/sign_model');
const handleResponse = require("../utils/handleResponse");
const getSectionTitle = require("../utils/getSectionTitle");

const getImageBySection = async (res, req, sectionTitle) => {
    try {
        const images = await Image.find({ section: sectionTitle });
        if (images.length === 0) {
            handleResponse(res, 404, { error: "No images found" });
            return;
        }
        const response = {
            title: getSectionTitle(sectionTitle),
            images: images.map(image => ({
                src: image.image, // Corrected from `title: image.image`
                title: image.title,
                subtitle: image.subtitle
            }))
        };
        handleResponse(res, 200, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, 500, { error: "Error fetching images" });
    }
}

module.exports = {
    getImageBySection
};