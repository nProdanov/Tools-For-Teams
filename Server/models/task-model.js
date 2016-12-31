/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("Task", {
    projectId: String,
    title: String,
    description: String,
    timeForExecution: String,
    cost: Number,
    status: String,
    users: [],
    deleted: {
        type: Boolean,
        default: false
    }
});