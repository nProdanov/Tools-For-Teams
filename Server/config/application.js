/* globals module require */

const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    cors = require("cors"),
    encryption = require("../utils/encryption");

module.exports = function ({ data }) {
    let app = express();

    app.set("view engine", "pug");

    app.use(cookieParser());
    app.use('/libs', express.static('./node_modules'));
    app.use("/static", express.static("./public"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({ secret: "top secret" }));
    app.use(cors());

    data.encryption = encryption;

    return app;
};
