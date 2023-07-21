import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/header/AppHeader.js';
import Body from './components/body/Body.js';
import React, { useState, useEffect } from 'react';
import PriorityQueue from './utils/PriorityQueue';
import AddTask from './components/addTask/AddTask.js';
import EditTask from './components/editTask/EditTask';
import TaskInfo from './components/taskInfo/TaskInfo';
import axios from 'axios';

function App() {
  const loggedUser = "adriviciano";
  const [tasks, setTasks] = useState(new PriorityQueue());
  const [taskList, setTaskList] = useState([]);

  const printTaskList = () => {
    setTaskList(tasks.print());
  };

  const addTask = (task, priority) => {
    tasks.enqueue(task, priority);
    setTasks(tasks);
    printTaskList();
  };

  const removeTask = async (task) => {
    console.log('Deleting ' + task)
    tasks.dequeue(task);
    setTasks(tasks);
    await axios.put(`http://localhost:4000/api/users/${loggedUser}`, {tasks: JSON.stringify(tasks)})
    printTaskList();
  };

  function convertToPriorityQueue(obj) {
    const priorityQueue = new PriorityQueue();
    // Recorre los elementos del objeto plano y los agrega a la cola con prioridad
    for (let i = 0; i < obj.items.length; i++) {
      const { element, priority } = obj.items[i];
      priorityQueue.enqueue(element, priority);
    }
    return priorityQueue;
  }

  useEffect(() => {
    const loadList = async () => {
      const response = await axios.get(`http://localhost:4000/api/users/${loggedUser}`);
      const userInfo = response.data;
      console.log(userInfo)
      if (userInfo.tasks) {
        const tasksObject = JSON.parse(userInfo.tasks)
        const priorityQueue = convertToPriorityQueue(tasksObject);
        setTasks(priorityQueue);
        setTaskList(priorityQueue.print());
        console.log('Lista cargada desde la caché del navegador.');
      } else {
        console.log('No se encontró ninguna lista en la caché del navegador.');
      }
    };
    loadList()
  }, [])

  return (
    <div className="App">
      <AppHeader/>
      <Routes>
        <Route path='/' element={
          <Body
            tasks={taskList}
            removeTask={removeTask}
            user={loggedUser}
          />}
        />
        <Route path='/add' element={
          <AddTask
            className="addTask"
            addTask={addTask}
            tasks={tasks}
            user={loggedUser}
          />}
        />
        <Route path='/tasks/:name/edit' element={
          <EditTask
            className="addTask"
            addTask={addTask}
            user={loggedUser}
          />}
        />
        <Route path='/tasks/:name/info' element={
          <TaskInfo
            className="addTask"
            user={loggedUser}
            remove={removeTask}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
