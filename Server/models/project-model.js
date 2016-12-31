/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("Project", {
    creator: String,
    name: String,
    description: String,
    projectMembers: [String],
    tasks: [],
    messages: [],
    notes: []
});