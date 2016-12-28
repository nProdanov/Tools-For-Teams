/* globals module */

module.exports = function (params) {
    let { data, validator } = params;
    return {
        createProject(req, res) {
            let project = req.body;
            data.createProject(project.creator, project.name, project.description)
                .then((project) => {
                    res.json(project);
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getAllProjects(req, res) {
            data.getAllProjects()
                .then(projects => {
                    res.json(projects);
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getProjectById(req, res) {
            data.getProjectById(req.params.id)
                .then(project => {
                    res.json(project);
                })
                .catch(err => {
                    res.json(err);
                })
        },
        addUserToProject(req, res) {
            data.addUserToProject(req.params.id, req.body.username)
                .then(() => {
                    res.json("User added successfully to project!");
                })
                .catch((err) => {
                    res.json(err);
                });
        },
        addMessageToProject(req, res) {
            data.addMessageToProject(req.body.projectName, req.body.created, req.body.from, req.body.message)
                .then(() => {
                    res.json({});
                })
                .catch((err) => {
                    res.json(err);
                })
        },
        getLastTenMessages(req, res) {
            data.getLastTenMessages(req.params.name)
                .then((messages) => {
                    res.json(messages);
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    };
};