const {ServerConstants} = require('../../utilities/AppConstants.js');
const base64Img = require('base64-img');

/**
 * This is a post api
 * @param req
 * @param res
 */
function addUser(req, res) {
    global.logger.info("Received POST request: " + JSON.stringify(req.body));
    res.status(200).send({
        added: true
    });
}

/*
 * Get API
 */
function getUserStatus(req, res) {
    global.logger.info("Received GET request with path param: " + req.params.name);
    res.status(200).send({
        isActive: true
    });
}

/**
 * Handle image upload
 * @param req
 * @param res
 */
function postImageData(req, res) {
    const requestData = req.body;
    global.logger.info("Received POST request for image from user: " + requestData.user);
    const image = requestData.image;
    global.logger.info(image);
    // base64Img.img(image, 'data', 'NewImage', function (err, filepath) {
    //     global.logger.info('Image has been saved.');
    // });
    res.status(200).send({
        imageAdded: true
    });
}

module.exports = {
    getUserStatus,
    addUser,
    postImageData
};