/* globals module Promise */

module.exports = function(models) {
    let { AboutData } = models;

    return {
        getAllAboutData() {
            return new Promise((resolve, reject) => {
                AboutData.find({}, (err, aboutData) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(aboutData);
                });
            });
        },
        createAboutData() {
            return new Promise((resolve, reject) => {

                let data = new AboutData({
                    data: ["asd1", "asd2", "asd3"]
                });

                data.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(data);
                })
            });
        }
    };
};