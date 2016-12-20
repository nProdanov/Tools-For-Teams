/* globals module Promise */

module.exports = function (models) {
    let { Project } = models;

    return {
        createProject(creator, name, description) {
            return new Promise((resolve, reject) => {
                let project = new Project({
                    Project,
                    creator,
                    name,
                    description
                })

                project.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(project);
                });
            });
        }
    };
};