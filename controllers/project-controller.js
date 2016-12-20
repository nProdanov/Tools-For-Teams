/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        createProject(req, res) {
            let project = req.body;

            data.createProject(project.creator, project.name, project.description)
                .then(res.json({ "message": "Project created successfully." }));
        }
    };
};