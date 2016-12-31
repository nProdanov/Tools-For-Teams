/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        createTask(req, res) {
            let task = req.body;

            data.createTask(task.projectId, task.title, task.description, task.timeForExecution, task.cost, task.status, task.users)
                .then(task => {
                    res.json(task);
                })
                .catch(err => {
                    res.json({ err });
                });
        },
        editTask(req, res) {
            let task = req.body.task;

            data.editTask(task)
                .then(resTask => {
                    res.json(resTask);
                })
                .catch(err => {
                    console.log(err);
                    res.json({ err });
                });
        }
    };
};