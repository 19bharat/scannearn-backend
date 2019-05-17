require('./src/logger');
const {ServerConstants, StatusConstants} = require('./src/utilities/AppConstants.js');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');

//To handle multipart request
const multer = require('multer');
const upload = multer();

let express_server;

//command line flag
let localServer = false;

//Parsing command line flags
process.argv.forEach(function (val, index, array) {
    if (val.indexOf('--local') >= 0) {
        if (val.split('=')[1].toString() === 'true') localServer = true;
    }
});

// Server certificate and private key
const options = {
    key: fs.readFileSync('./ssl/server.key', 'utf8'),
    cert: fs.readFileSync('./ssl/server.crt', 'utf8')
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//create a cors middleware
app.use(function (req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

try {

    if (localServer === true) {

        //When testing locally
        express_server = http.createServer(app);
    } else {

        //Prod mode supporting ssl
        express_server = https.createServer(options, app)
    }

    global.logger.info(JSON.stringify({
        code: StatusConstants.SUCCESS,
        text: 'Scan & Earn server started at port => ' + ServerConstants.EXPRESS_PORT,
        type: ServerConstants.DEBUG
    }));

} catch (e) {
    global.logger.info(JSON.stringify({
        code: StatusConstants.SERVER_ERR,
        text: 'Error starting Realcomm server at port => ' + ServerConstants.EXPRESS_PORT,
        type: ServerConstants.ERROR
    }));
}

//Registering all the apis
require('./src/api/controllers')(app, upload, express_server);
