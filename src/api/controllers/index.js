const {ServerConstants} = require('../../utilities/AppConstants.js');
const {
    getUserStatus,
    addUser
} = require('../impl/ServiceImpl.js');

module.exports = (app, express_server) => {

    try {

        /*
         * API to know the status of a user whether he is online or not
         */
        app.get(ServerConstants.API_BASE_URL + 'user/:name', getUserStatus);

        /*
         * API to consume webrtc answer from a user
         */
        app.post(ServerConstants.API_BASE_URL + 'user/add', addUser);

        express_server.listen(ServerConstants.EXPRESS_PORT);

    } catch (e) {
        global.logger.info(JSON.stringify({
            code: StatusConstants.SERVER_ERR,
            text: 'error while registering api endpoints on express server.',
            type: ServerConstants.ERROR
        }));
    }
};