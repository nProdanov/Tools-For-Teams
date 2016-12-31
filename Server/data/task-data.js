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

                    if (task !== null) {
                        return reject({ error: "Task already exists in this project!" });
                    }

                    let taskToAdd = new Task({
                        projectId,
                        title,
                        description,
                        timeForExecution,
                        cost,
                        status,
                        users,
                        deleted: 'false'
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
                    return new Promise((resolve, reject) => {
                        Project.findOne({ _id: newTask.projectId }, (err, project) => {
                            if (err) {
                                return Promise.reject(err);
                            }

                            project.tasks.push(newTask);
                            project.save((err) => {
                                if (err) {
                                    return reject(err);
                                }

                                return resolve(newTask);
                            });
                        });
                    });
                });
        },
        editTask(task) {
            let taskToReturn;
            return new Promise((resolve, reject) => {
                Task.findOne({ _id: task._id }, (err, foundTask) => {
                    if (err) {
                        return reject(err);
                    }

                    if (foundTask) {
                        return resolve(foundTask);
                    }
                });
            })
                .then(foundTask => {
                    foundTask.title = task.title;
                    foundTask.description = task.description;
                    foundTask.timeForExecution = task.timeForExecution;
                    foundTask.cost = task.cost;
                    foundTask.status = task.status;
                    foundTask.users = task.users;
                    foundTask.save(err => {
                        if (err) {
                            return Promise.reject(err);
                        }
                    });

                    return Promise.resolve(foundTask);
                })
                .then(foundTask => {
                    return new Promise((resolve, reject) => {
                        Project.update({ 'tasks._id': foundTask._id }, {
                            '$set': {
                                'tasks.$.title': foundTask.title,
                                'tasks.$.description': foundTask.description,
                                'tasks.$.timeForExecution': foundTask.timeForExecution,
                                'tasks.$.cost': foundTask.cost,
                                'tasks.$.status': foundTask.status,
                                'tasks.$.users': foundTask.users
                            }
                        }, (err) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(foundTask);
                        });
                    });
                });
        },
        deleteTask(taskId, projectId) {
            return new
                Promise((resolve, reject) => {
                    Task.findOne({ _id: taskId }, (err, task) => {
                        if (err) {
                            return reject(err);
                        }

                        if (task) {
                            task.deleted = true;
                            return resolve(task);
                        }
                    })
                })
                .then(task => {
                    task.save(err => {
                        if (err) {
                            return Promise.reject(err);
                        }
                    });

                    return Promise.resolve(task);
                })
                .then((task) => {
                    return new Promise((resolve, reject) => {
                        Project.update({ 'tasks._id': task._id }, {
                            '$set': {
                                'tasks.$.deleted': true,
                            }
                        }, (err) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(task);
                        });
                    });
                });
        }
    };
};