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
                    res.json({ err });
                });
        },
        deleteTask(req, res) {
            let taskId = req.params.id;
            let projectId = req.body.projectId;
            data.deleteTask(taskId, projectId)
                .then(resTask => {
                    res.json(resTask);
                })
                .catch(err => {
                    res.json({ err });
                });
        }
    };
};