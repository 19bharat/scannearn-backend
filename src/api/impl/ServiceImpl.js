const {ServerConstants} = require('../../utilities/AppConstants.js');

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

module.exports = {
    getUserStatus,
    addUser
};