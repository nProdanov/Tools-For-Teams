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
        .get("/notifications/:username", controllers.getUserProjectsNotifications)
        .put("/notifications/:id", controllers.updateNotification)
        .put("/projects/:id", controllers.addUserToProject)
        .post("/notifications", controllers.saveNotification)
        .put("/users/:id", controllers.editUser)
        .put("/tasks/:id/delete", controllers.deleteTask)
        .put("/tasks/:id", controllers.editTask)
        .post("/notifications/all", controllers.updateAllNotifications)
        .post("/tasks", controllers.createTask)
        .post("/projects", controllers.createProject)
        .post("/messages", controllers.addMessageToProject)
        .post("/users", controllers.createUser)
        .post('/users/:userId/projects', controllers.addProjectToUser);

    app.use("/api", router);

    return router;
};