const Task = require('../models/task.model');

async function httpAddNewTask(req, res) {
    //const task = new Task(req.body);

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send();
    }
}

async function httpGetAllTasks(req, res) {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
}

async function httpGetTaskById(req, res) {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) { 
            return res.status(404).send();
        }
        res.send(task);

    } catch (e) {
        res.status(500).send();
    }
}

async function httpUpdateTask(req, res) {
    const _id = req.params.id;
    const update = req.body;
    const updates = Object.keys(update);
    const allowedUpdates = ["name", "completed", "done", "estimated"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({error:'Invalid updates'})
    }
    try {
        const task = await Task.findOne({ _id, owner:req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        
        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function httpDeleteTask (req, res){
    _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
}

async function httpDeleteCompletedTasks(req, res) {
    const tasks = await Task.deleteMany({ completed: true});
}

module.exports = {
    httpAddNewTask,
    httpGetAllTasks,
    httpDeleteTask,
    httpGetTaskById,
    httpUpdateTask,
    httpDeleteCompletedTasks
}