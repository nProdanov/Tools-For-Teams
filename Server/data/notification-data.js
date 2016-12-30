/* globals module Promise */

module.exports = function (models) {
    let { Notification } = models;

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
        }
    };
};