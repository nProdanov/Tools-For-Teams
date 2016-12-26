/* globals require console */
var config = require('./config');
var validator = require('./utils/validator');
var data = require('./data')(config.connectionString, validator);
var controllers = require('./controllers')({ data: data, validator: validator });
var _a = require('./config/application')({ data: data }), app = _a.app, server = _a.server;
var io = require('./config/socket')({ server: server, data: data });
require('./routers')({ app: app, data: data, controllers: controllers });
server.listen(config.port, function () { return console.log("App running at: " + config.port); });
//# sourceMappingURL=app.js.map