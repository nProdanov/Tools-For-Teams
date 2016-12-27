/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Message", {
    room: {
        type: String,
        index: true
    },
    created: Date,
    from: String,
    to: String,
    message: String
});
