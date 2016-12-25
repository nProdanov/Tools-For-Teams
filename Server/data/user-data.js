/* globals module */

const dataUtils = require("./utils/data-utils");
const encrypt = require("../utils/encryption");

module.exports = function (models, validator) {
    let { User } = models;

    return {
        createUser(id,
            username,
            name,
            picture,
            email,
            company) {
            return new
                Promise((resolve, reject) => {
                    // if (!validator.validateStringLength(username, 3, 50)) {
                    //     return reject("Error: Username must be between 3 and 50 symbols");
                    // }

                    // if (!validator.validateIsStringValid(username)) {
                    //     return reject("Username fail");
                    // }

                    // if (!validator.validateStringLength(firstName, 3, 50)) {
                    //     return reject("Error: First name must be between 3 and 50 symbols");
                    // }

                    // if (!validator.validateIsStringValid(firstName)) {
                    //     return reject("First name fail");
                    // }

                    // if (!validator.validateStringLength(lastName, 3, 50)) {
                    //     return reject("Error: Last name must be between 3 and 50 symbols");
                    // }

                    // if (!validator.validateIsStringValid(lastName)) {
                    //     return reject("Last name fail");
                    // }

                    // if (profileImgURL && !validator.validateImageUrl(profileImgURL)) {
                    //     return reject("Invalid image url");
                    // }

                    // if (!validator.validateEmail(email)) {
                    //     return reject("Email fail");
                    // }

                    // if (!salt) {
                    //     return reject("Salt must exists");
                    // }

                    // if (!hashPass) {
                    //     return reject("Hash pass must exists");
                    // }
                    console.log(username);
                    let user = new User({
                        User,
                        id,
                        username,
                        name,
                        picture,
                        email,
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

                    if (user) {
                        return resolve(user);
                    }

                    return reject(null);
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