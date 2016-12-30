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
        }
    };
};