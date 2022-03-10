
import './App.css';
import AddTask from './components/AddTask';
import DeleteTask from './components/DeleteTask';
import UpdateTask from './components/UpdateTask';
import ViewTasks from './components/ViewTasks';

function App() {
  return (
    <div>
      <ViewTasks />
      <AddTask />
      <UpdateTask />
      <DeleteTask />
    </div>
  );
}

export default App;
