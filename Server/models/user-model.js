/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("User", {
    id: {
        type: String,
        unique: true
    },
    username: String,
    firstName: String,
    lastName: String,
    gender: String,
    picture: String,
    email: String,
    company: String,
    isManager: false,
    projects: [{}]
});