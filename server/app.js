
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const getDate = require('./utils/date')
const Task = require('./schemas/task')

// const date = getDate()
// console.log(date)

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.cdqn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
}, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('successfully connected to MongoDB')
    }
})

app.post('/add-task', async (req, res) => {
    const date = getDate()
    try {
        const task = await Task.create({
            title: req.body.title,
            priority: req.body.priority,
            dateCreated: date
        })
        res.json({ success: true, message: 'Task added!', taskAdded: task })
    } catch (error) {
        console.log(error)
    }
})

app.get('/view-tasks', async (req, res) => {
    const tasks = await Task.find({})
    res.send(tasks)
})


app.get('/task/:taskId', async (req, res) => {
    const task = await Task.findById(req.params.taskId)
    res.send(task)
})

app.put('/update-task/:taskId', async (req, res) => {
    const date = getDate()
    const task = {
        title: req.body.title,
        priority: req.body.priority,
        dateUpdated: date
    }

    try {
        await Task.findByIdAndUpdate(req.params.taskId, task)
        res.json({ success: true, message: 'Task updated.' })
    } catch (error) {
        console.log(error)
    }

})

app.delete('/delete-task/:taskId', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId)
        res.json({ taskDeleted: deletedTask, success: true, message: 'Task Deleted!' })
    } catch (error) {
        console.log(error)
    }
})

app.listen(8080, () => {
    console.log('Server is running...')
})



