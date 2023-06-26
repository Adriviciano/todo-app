import './App.css';
import AppHeader from './components/header/AppHeader.js';
import Body from './components/body/Body.js';
import React, { useState } from 'react';
import PriorityQueue from './utils/PriorityQueue';
import AddTask from './components/addTask/AddTask.js';

function App() {

  const [tasks, setTasks] = useState(new PriorityQueue());
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const printTaskList = () => {
    setTaskList(tasks.print());
  }

  const addTask = (task, priority) => {
    tasks.enqueue(task, priority);
    setTasks(tasks);
    printTaskList();
  };

  const removeTask = (task) => {
    tasks.dequeue(task);
    setTasks(tasks);
    printTaskList();
  }

  return (
    <div className="App">
      <AddTask className="addTask"
        show={modal}
        setShow={setModal}
        addTask={addTask}
      />
      <AppHeader
        setTasks={setTasks}
        setTasksList={setTaskList}
        tasks={tasks}
      />
      <Body
        tasks={taskList}
        modal={modal}
        setModal={setModal}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
