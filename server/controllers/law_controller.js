const Law = require('../models/law_model');
const handleResponse = require("../utils/handleResponse");

const getLawsBySection = async (res,req,id) => {
    try {
        const laws = await Law.find({section: id});
        if (laws.length === 0) {
            handleResponse(res, 404, { error: "No laws found" });
            return;
        }
        handleResponse(res, 200, laws);
    } catch (error) {
        console.log(error);
        handleResponse(res, 500, { error: "Error fetching laws" });
    }
}

module.exports = {
    getLawsBySection
}