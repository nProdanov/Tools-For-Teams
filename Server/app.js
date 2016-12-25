/* globals require console */
var config = require('./config');
var validator = require('./utils/validator');
var data = require('./data')(config.connectionString, validator);
var controllers = require('./controllers')({ data: data, validator: validator });
var app = require('./config/application')({ data: data });
require('./routers')({ app: app, data: data, controllers: controllers });
app.listen(config.port, function () { return console.log("App running at: " + config.port); });
//# sourceMappingURL=app.js.map