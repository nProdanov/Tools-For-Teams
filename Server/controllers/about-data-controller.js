/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        getAllAboutData(req, res) {
            data.getAllAboutData()
                .then(aboutData => {
                    res.json(aboutData);
                })
                .catch(err => {
                    res.json(err);
                });
        },
        createAboutData(req, res) {
            data.createAboutData()
                .then(aboutData => {
                    res.json(aboutData);
                })
                .catch(err => {
                    res.json(err);
                })
        }
    };
};