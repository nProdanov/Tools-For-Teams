/* globals module */

const dataUtils = require("./utils/data-utils");
const encrypt = require("../utils/encryption");

module.exports = function (models, validator) {
    let { User } = models;

    return {
        createUser({id, username, firstName, lastName, email, gender, picture, company}) {
            return new
                Promise((resolve, reject) => {

                    let user = new User({
                        id,
                        username,
                        firstName,
                        lastName,
                        picture,
                        email,
                        gender,
                        company
                    });

                    user.save(err => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
                });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user || null);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find({}, (err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(users);
                });
            });
        },
        addProjectToUser(userId, project) {
            return new Promise((resolve, reject) => {
                User.findOne({ id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (user) {
                        return resolve(user);
                    }

                    return reject("user not found");
                });
            })
                .then(user => {
                    let projectToAdd = {
                        id: project.projectId,
                        name: project.projectName
                    };

                    user.projects.push(projectToAdd);
                    user.save(err => {
                        if (err) {
                            return Promise.reject(err);
                        }

                    });

                    return Promise.resolve(user);
                });
        }
    };
};