import { useState } from 'react'

function AddTask() {

    const [task, setTask] = useState({})

    const handleTextUpdate = (event) => {

        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmitTask = () => {
        fetch('http://localhost:8080/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(response => response.json())
            .then(result => {
                alert(result.message)
            })
    }


    return (
        <div>
            <h1>Add Task</h1>
            <input type="text" placeholder="Task Title" name="title" onChange={handleTextUpdate} />
            <input type="text" placeholder="Task Priority" name="priority" onChange={handleTextUpdate} />
            <button onClick={handleSubmitTask}>Submit</button>
        </div>
    )
}

export default AddTask
