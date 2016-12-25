/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, controllers }) {
    let router = new Router();

    router
        .get("/users/:id", controllers.getUserById)
        .get("/projects", controllers.getAllProjects)
        .post("/projects", controllers.createProject)
        .post("/users", controllers.createUser)
        .post('/users/:userId/projects', controllers.addProjectToUser);

    app.use("/api", router);

    return router;
};