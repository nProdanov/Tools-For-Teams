/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, controllers }) {
    let router = new Router();

    router
        .get("/users", controllers.getAllUsers)
        .get("/users/:id", controllers.getUserById)
        .get("/projects", controllers.getAllProjects)
        .get("/projects/:id", controllers.getProjectById)
        .post("/tasks", controllers.createTask)
        .post("/projects", controllers.createProject)
        .post("/users", controllers.createUser)
        .post('/users/:userId/projects', controllers.addProjectToUser);

    app.use("/api", router);

    return router;
};