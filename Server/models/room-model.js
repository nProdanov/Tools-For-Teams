/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Room", {
    name: {
        type: String,
        unique: true
    },
    created: Date
});