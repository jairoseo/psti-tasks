const mongoose = require("mongoose");
let express = require("express");
let router = express.Router();
const mongoServer  = process.env.MONGODB_URI;

try {
    mongoose.connect(mongoServer);
    console.log("Successful DB connection");
} catch (error) {
    console.error("Connection error ", error);
}

let TaskModel = require('./task_schema');

router.get("/all-task", async(req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).send("Internal error\n");
    }
});

router.post("/create-task", async(req, res) => {
    if(req.body.TaskId && req.body.Name && req.body.Deadline){
        const task = new TaskModel({
            TaskId : req.body.TaskId,
            Name : req.body.Name,
            Deadline : req.body.Deadline,
        });
        try {
            await task.save();
            res.json(task);
        } catch (error) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
    }else{
        res.status(404).send("Incomplete fields\n");
    }
});

router.put("/update-task", async(req, res) => {
    try {
        const task = await TaskModel.findOneAndUpdate({TaskId : req.body.TaskId}, {
            Name : req.body.Name,
            Deadline : req.body.Deadline
        },{ new : true});
        if(task){
            res.json(task);
        }else{
            res.status(404).send("Task not found");
        }
    } catch (error) {
        res.status(500).send("Internal error\n")
    }
});

router.delete("/delete-task", async(req, res) => {
    try {
        const task = await TaskModel.deleteOne({TaskId: req.body.TaskId});
        if(task.deletedCount === 1){
            res.status(200).send("OK\n");
        }else{
            res.status(404).send("Task not found\n");
        }
    } catch (error) {
        res.status(500).send("Internal error\n");
    }
});

module.exports = router;