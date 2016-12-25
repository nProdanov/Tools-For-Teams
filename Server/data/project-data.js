/* globals module Promise */

module.exports = function (models) {
    let { Project } = models;

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
                        description
                    })

                    project.save((err) => {
                        if (err) {
                            return Promise.reject(err);
                        }
                    });
                    return Promise.resolve(project);
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
            });
        }
    };
};