/* globals module */

function validateUser({ validator, username, firstName, lastName, profileImgURL }) {
    let validatorError = {};
    validatorError.messages = [];

    if (!validator.validateStringLength(username, 3, 50)) {
        validatorError.error = true;
        validatorError.messages.push("Error: Username must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(username)) {
        validatorError.error = true;
        validatorError.messages.push("Username fail");
    }

    if (!validator.validateStringLength(firstName, 3, 50)) {
        validatorError.error = true;
        validatorError.messages.push("Error: First name must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(firstName)) {
        validatorError.error = true;
        validatorError.messages.push("First name fail");
    }

    if (!validator.validateStringLength(lastName, 3, 50)) {
        validatorError.error = true;
        validatorError.message.push("Error: Last name must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(lastName)) {
        validatorError.error = true;
        validatorError.messages.push("Last name fail");
    }

    if (profileImgURL && !validator.validateImageUrl(profileImgURL)) {
        validatorError.error = true;
        validatorError.messages.push("Invalid image url");
    }

    return validatorError;
}

module.exports = function(params) {
    let { data, validator } = params;
    return {
        register(req, res) {
            let {
                username,
                password,
                email,
                profileImgURL,
                firstName,
                lastName
            } = req.body;

            let validatorError = validateUser({ validator, username, firstName, lastName, profileImgURL });

            if (!validator.validateEmail(email)) {
                validatorError.error = true;
                validatorError.messages.push("Email fail");
            }

            if (validatorError.error) {
                let error = {
                    messages: validatorError.messages
                };

                return res.json({ error });
            }

            let salt = data.encryption.generateSalt();
            let hashPass = data.encryption.generateHashedPassword(salt, password);

            data.createUser(
                    username,
                    firstName,
                    lastName,
                    email,
                    profileImgURL,
                    salt,
                    hashPass)
                .then(() => {
                    res.status(201).json({ "message": "You have been registered successfully" });
                })
                .catch(err => {
                    res.json(err);
                });
        },
        unauthorized(req, res) {
            return res.status(200).render("authentication/unauthorized", {
                user: req.user
            });
        }
    };
};