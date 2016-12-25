/* globals module */

const REQUIRED_POINTS_PER_STAR = 45;

module.exports = function (params) {
    let { data, validator } = params;
    return {
        createUser(req, res) {
            data.createUser(req.body.id, req.body.username, req.body.name, req.body.picture, req.body.email, req.body.company)
                .then(() => {
                    res.json("User created successfully!");
                });
        },
        getUserById(req, res) {
            data.getUserById(req.params.id)
                .then((user) => {
                    res.json(user);
                })
                .catch(err => {
                    res.json(err);
                });
        },
        addProjectToUser(req, res) {
            data.addProjectToUser(req.params.userId, req.body)
                .then((response) => {
                    res.json(response);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};