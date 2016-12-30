/* globals module Promise */

module.exports = function (models) {
    let { Notification, User, Project } = models;

    return {
        saveNotification(notification) {
            return new Promise((resolve, reject) => {
                let notificationToAdd = new Notification({
                    projectName: notification.projectName,
                    content: notification.content,
                    created: notification.created,
                    deleted: notification.deleted
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
        },
        updateNotification(id) {
            return new Promise((resolve, reject) => {
                Notification.findOne({ _id: id }, (err, notification) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(notification);
                });
            })
                .then(notification => {
                    notification.deleted = true;

                    notification.save((err) => {
                        if (err) {
                            return Promise.reject(err);
                        }
                    });

                    return Promise.resolve(notification);
                });
        },
        updateAllNotifications(notifications) {
            return new Promise((resolve, reject) => {
                Notification.find({
                    '_id': {
                        $in: notifications
                    }
                }, (err, resNotifications) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(resNotifications);
                });
            })
                .then(notifications => {
                    notifications.forEach(notification => {
                        notification.deleted = true;
                    });

                    var ids = [];
                    for (let i = 0; i < notifications.length; i += 1) {
                        ids.push(notifications[i]._id);
                    }

                    Notification.update({ _id: { "$in": ids } }, { deleted: true }, { multi: true }, (err, resNotifications) => {
                        if (err) {
                            return Promise.reject(err);
                        }

                        return Promise.resolve(resNotifications);
                    });
                });
        }
    };
};