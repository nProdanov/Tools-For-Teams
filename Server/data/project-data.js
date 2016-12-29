/* globals module Promise */

module.exports = function (models) {
    let { Project, User, Message } = models;

    return {
        createProject(creator, name, description) {
            return new
                Promise((resolve, reject) => {
                    Project.findOne({ name }, (err, project) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(project || null);
                    });
                })
                .then((foundProject) => {
                    if (foundProject !== null) {
                        return Promise.reject("Project already exists");
                    }

                    let project = new Project({
                        Project,
                        creator,
                        name,
                        description,
                        projectMembers: [creator]
                    })

                    project.save((err) => {
                        if (err) {
                            return Promise.reject(err);
                        }
                    });
                    return Promise.resolve(project);
                });
        },
        getTenMessages(name) {
            return new Promise((resolve, reject) => {
                Project.findOne({ name }, (err, project) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(project);
                })
            })
                .then((project) => {
                    let messages = project.messages
                        .sort((a, b) => {
                            return new Date(a.created) - new Date(b.created);
                        })
                        .slice(0);

                    return Promise.resolve(messages);
                });
        },
        getAllProjects() {
            return new Promise((resolve, reject) => {
                Project.find({}, (err, projects) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(projects);
                });
            });
        },
        getProjectById(id) {
            return new Promise((resolve, reject) => {
                Project.findOne({ _id: id }, (err, project) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(project);
                })
            })
                .then((project) => {
                    return new Promise((resolve, reject) => {
                        let messages = project.messages
                            .sort((a, b) => {
                                return new Date(a.created) - new Date(b.created);
                            })
                            .slice(project.messages.length - 10);
                            
                        return resolve(project);
                    });
                });
        },
        getProjectByIdMapped(id) {
            return new Promise((resolve, reject) => {
                Project.findOne({ _id: id }, (err, project) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve({
                        _id: project._id,
                        name: project.name,
                        description: project.description,
                        creator: project.creator
                    });
                })
            });
        },
        addMessageToProject(projectName, created, from, message, picture) {
            return new Promise((resolve, reject) => {
                Project.findOne({ name: projectName }, (err, project) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(project);
                });
            })
                .then((project) => {
                    return new Promise((resolve, reject) => {
                        let messageToAdd = new Message({
                            projectName,
                            created,
                            from,
                            message,
                            picture
                        });

                        project.messages.push(messageToAdd);
                        project.save((err) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(project);
                        });
                    });
                });
        },
        addUserToProject(id, username) {
            return new Promise((resolve, reject) => {
                Project.findOne({ _id: id }, (err, project) => {
                    if (err) {
                        return reject(err);
                    }

                    if (project !== null) {
                        project.projectMembers.push(username);
                    }

                    project.save((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(project);
                    });
                });
            })
                .then(project => {
                    User.findOne({ username }, (err, user) => {
                        if (err) {
                            return Promise.reject(err);
                        }

                        if (user) {
                            user.projects.push({ id, name: project.name });
                            user.save((saveErr) => {
                                if (saveErr) {
                                    return Promise.reject(saveErr);
                                }

                                return Promise.resolve(project);
                            });
                        }
                    });
                });
        }
    };
};