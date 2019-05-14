const log4js = require('log4js');
const log4js_extend = require("log4js-extend");

log4js.configure({
    appenders: {
        debug: {
            type: 'dateFile', filename: 'logs/realcomm.log', pattern: "-dd-MM-yyyy", layout: {
                type: 'pattern',
                pattern: '[%d] %p %m',
            }
        },
        trace: {
            type: 'console', layout: {
                type: 'pattern',
                pattern: '[%d] %p %m',
            }
        }
    },
    categories: {
        default: {appenders: ['debug', 'trace'], level: 'debug'}
    }
});

log4js_extend(log4js, {
    path: __dirname,
    format: " {@file:@line:@column}"
});

global.logger = log4js.getLogger('debug');
