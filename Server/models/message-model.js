/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Message", {
    projectName: {
        type: String,
        index: true
    },
    created: Date,
    from: String,
    message: String,
    picture: String
});
