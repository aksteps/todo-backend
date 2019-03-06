const express = require('express')
const dotenv = require('dotenv')
const parseRequest = require('./app/middlewares/parse_request')
const { Task } = require('./models')
const app = express();
const port = 4000;

const Sequelize = require('sequelize');
const SQL_OP = Sequelize.Op;

dotenv.config();

app.use(parseRequest);

app.get('/tasks', (req, res) => {
    return Task.findAll().then(
        tasks => {
            return res.json(tasks)
        });
});

app.post('/tasks', async (req, res) => {
    const task_data = {name : req.body.name, status : 0 };
    Task.create(task_data).then(task => {
        res.json(task);
    });
});

app.get('/tasks/:taskId', async (req, res) => {
    Task.findByPk(req.params.taskId).then(task => {
        res.json(task);
    });
});

app.patch('/tasks/:taskId', async (req, res) => {
    Task.update(req.body, { where : {id: { [SQL_OP.eq] : req.params.taskId}} })
    .then(number_of_rows => {
        if(number_of_rows > 0)
        return res.json({message: "Updated"});

        return res.json({message: "Task doesn't exist"});

    });
});

app.delete('/tasks/:taskId', async (req, res) => {
    Task.destroy({ where : {id: { [SQL_OP.eq] : req.params.taskId}} })
    .then(number_of_rows => {
        if(number_of_rows > 0)
        return res.json({message: "Deleted"});
        
        return res.json({message: "Task doesn't exist"});
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));