/* globals module Promise */

module.exports = function (models) {
    let { Notification, User, Project } = models;

    return {
        saveNotification(notification) {
            return new Promise((resolve, reject) => {
                let notificationToAdd = new Notification({
                    projectName: notification.projectName,
                    content: notification.content,
                    created: notification.created
                });

                notificationToAdd.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(notificationToAdd);
                });
            });
        },
        getUserProjectsNotifications(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            })
                .then(user => {
                    let projectNames = user.projects.map(project => {
                        return project.name;
                    });

                    return Promise.resolve(projectNames);
                })
                .then(projectNames => {
                    return new Promise((resolve, reject) => {
                        Notification.find({
                            'projectName': {
                                $in: projectNames
                            },
                            'deleted': false
                        }, function (err, notifications) {
                            if (err) {
                                return reject(err);
                            } 

                            return resolve(notifications);
                        });
                    });
                });
        }
    };
};