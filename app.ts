/* globals require console */

const config = require('./config');
const validator = require('./utils/validator');

let data = require('./data')(config.connectionString, validator);

let controllers = require('./controllers')({ data, validator });

let app = require('./config/application')({ data });

require('./routers')({ app, data, controllers });

app.listen(config.port, () => console.log(`App running at: ${config.port}`));
