/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("ProjectChat", {
    projectName: String,
    messages: []
});