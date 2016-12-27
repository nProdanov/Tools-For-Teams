/* globals module Promise */

module.exports = function (models) {
    let { ProjectChat } = models;

    return {
        createProjectChat(projectName) {
            return new Promise((resolve, reject) => {
                let newProjectChat = new ProjectChat({
                    projectName
                });

                newProjectChat.save((err, projectChat) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(projectChat);
                });
            });
        },
        getProjectChatByName(name) {
            return new Promise((resolve, reject) => {
                ProjectChat.findOne({ projectName: name }, (err, projectChat) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(projectChat);
                });
            });
        }
    };
};
