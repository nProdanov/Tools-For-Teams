/* globals module */

const REQUIRED_POINTS_PER_STAR = 45;

module.exports = function(params) {
    let { data, validator } = params;
    return {
        createUser(req, res) {
            data.createUser(req.body)
                .then(() => {
                    res.json("User created successfully!");
                })
                .catch(err => {
                    res.json({ error: err })
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
        getUserByUsername(req, res) {
            data.getUserByUsername(req.params.username)
                .then(user => {
                    res.json(user);
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getAllUsers(req, res) {
            data.getAllUsers()
                .then((users) => {
                    res.json(users);
                })
                .catch((err) => {
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
        },
        editUser(req, res) {
            data.editUser(req.params.id, req.body)
                .then((response) => {
                    res.json(response);
                })
                .catch(err => {
                    res.json({ err });
                });
        }
    };
};