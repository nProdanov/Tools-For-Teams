/* globals module Promise */

module.exports = function (models) {
    let { Notification, User, Project } = models;

    return {
        saveNotification(notification) {
            return new Promise((resolve, reject) => {
                Project.findOne({ name: notification.projectName }, (err, project) => {
                    if (err) {
                        return reject(err);
                    }

                    let projectMembers = project.projectMembers;
                    return resolve({ projectMembers, notification });
                });
            })
                .then(({ projectMembers, notification }) => {
                    return new Promise((resolve, reject) => {
                        let notificationsToAdd = [];

                        projectMembers.forEach(member => {
                            let notificationToAdd = new Notification({
                                projectName: notification.projectName,
                                username: member,
                                content: notification.content,
                                created: notification.created,
                                deleted: notification.deleted
                            });

                            notificationsToAdd.push(notificationToAdd);
                        });

                        Notification.insertMany(notificationsToAdd, (err, notifications) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(notifications);
                        });
                    });
                });
        },
        getUserProjectsNotifications(username) {
            return new Promise((resolve, reject) => {
                Notification.find({
                    'username': username,
                    'deleted': false
                }, function (err, notifications) {
                    if (err) {
                        return reject(err);
                    }
                    console.log(notifications);
                    return resolve(notifications);
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