/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        saveNotification(req, res) {
            data.saveNotification(req.body)
                .then((notification) => {
                    res.json(notification);
                })
                .catch(err => {
                    res.json({ error: err })
                });
        },
        getUserProjectsNotifications(req, res) {
            data.getUserProjectsNotifications(req.params.username)
                .then(notifications => {
                    res.json(notifications);
                })
                .catch(err => {
                    res.json(err);
                });
        },
        updateNotification(req, res) {
            data.updateNotification(req.params.id)
                .then(res => {
                    res.json(res);
                })
                .catch(err => {
                    res.json(err);
                });
        },
        updateAllNotifications(req, res) {
            data.updateAllNotifications(req.body)
                .then(res => {
                    res.json(res);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};