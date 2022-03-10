
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    title: String,
    priority: String,
    dateCreated: String,
    dateUpdated: String

})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
