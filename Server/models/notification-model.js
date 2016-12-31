/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Notification", {
    projectName: String,
    username: String,
    content: String,
    created: Date,
    deleted: Boolean
});