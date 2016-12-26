/* globals module Promise */

module.exports = function (models) {
    let { Project, Task } = models;

    return {
        createTask(projectId, title, description, timeForExecution, cost, status, users) {
            return new Promise((resolve, reject) => {
                Task.findOne({ title, projectId }, (err, task) => {
                    if (err) {
                        return reject(err);
                    }

                    if (task !== undefined) {
                        return reject({ error: "Task already exists in this project!" });
                    }

                    let taskToAdd = new Task({
                        projectId,
                        title,
                        description,
                        timeForExecution,
                        cost,
                        status,
                        users
                    });

                    taskToAdd.save((err) => {
                        if (err) {
                            return reject(err);
                        }
                    });
                    return resolve(taskToAdd);
                });
            })
                .then((newTask) => {
                    Project.findOne({ _id: newTask.projectId }, (err, project) => {
                        if (err) {
                            return Promise.reject(err);
                        }

                        project.projectMembers.push(newTask);
                        project.save((err) => {
                            if (err) {
                                return Promise.reject(err);
                            }

                            return Promise.resolve(project);
                        });
                    });
                })
                .then((project) => {
                    return Promise.resolve({ message: "Task added successfully!" });
                });
        }
    };
};

