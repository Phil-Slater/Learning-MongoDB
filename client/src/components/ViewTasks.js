
import React, { useState } from 'react'

function ViewTasks() {

    const [tasks, setTasks] = useState([])

    const [task, setTask] = useState({})



    const getAllTasks = () => {
        fetch('http://localhost:8080/view-tasks')
            .then(response => response.json())
            .then(result => {
                setTasks(result)
            })
    }

    const deleteTask = (id) => {
        fetch(`http://localhost:8080/delete-task/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert(result.message)
                    getAllTasks()
                }
            })
    }

    const handleTextUpdate = (event) => {

        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    }

    const selectTaskToUpdate = (id) => {
        fetch(`http://localhost:8080/task/${id}`)
            .then(response => response.json())
            .then(result => {
                setTask(result)
            })
    }

    const handleUpdateTask = (id) => {
        fetch(`http:localhost:8080/update-task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(response => response.json())
            .then(result => {
                alert(result.message)
            })
    }

    const taskItems = tasks.map(task => {
        return <div key={task._id}><b>{task.title} - Priority: {task.priority}</b> - Created at: {task.dateCreated}
            {task.dateUpdated ?
                <div>Updated at: {task.dateUpdated}</div> : null}
            <div>
                <button onClick={() => selectTaskToUpdate(task._id)}>Update Task</button>
                <button onClick={() => deleteTask(task._id)}>Delete Task</button>
            </div>
        </div>
    })

    const taskToUpdate = (task) => {
        return <div><h1>Update Task</h1>
            <input type="text" value={task.title} name="title" onChange={handleTextUpdate} />
            <input type="text" placeholder="Task Priority" name="priority" onChange={handleTextUpdate} />
            <button onClick={handleUpdateTask}>Submit</button></div>

    }


    return (
        <div>
            <h1>All Tasks</h1>
            <button onClick={() => getAllTasks()}>View Tasks</button>
            {taskItems}
            {taskToUpdate()}
        </div>
    )
}

export default ViewTasks
