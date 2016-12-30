/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/users/:id", controllers.getUserById)
        .get("/users", controllers.getAllUsers)
        .get("/messages/:name", controllers.getTenMessages)
        .get("/project/:projectName", controllers.getProjectByProjectName)
        .get("/projects", controllers.getAllProjects)
        .get("/projects/all", controllers.getProjects)
        .get("/projects/:id", controllers.getProjectById)
        .get("/projects/:id/filtered", controllers.getProjectByIdMapped)
        .get("/users/:userId/projects", controllers.getUserById)
        .put("/projects/:id", controllers.addUserToProject)
        .post("/notifications", controllers.saveNotification)
        .post("/tasks", controllers.createTask)
        .post("/projects", controllers.createProject)
        .post("/messages", controllers.addMessageToProject)
        .post("/users", controllers.createUser)
        .post('/users/:userId/projects', controllers.addProjectToUser);

    app.use("/api", router);

    return router;
};