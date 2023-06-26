import './AppHeader.css';
import React from 'react';
import PriorityQueue from '../../utils/PriorityQueue';

export default function AppHeader(props) {

  function convertToPriorityQueue(obj) {
    const priorityQueue = new PriorityQueue();
    // Recorre los elementos del objeto plano y los agrega a la cola con prioridad
    for (let i = 0; i < obj.items.length; i++) {
      const { element, priority } = obj.items[i];
      priorityQueue.enqueue(element, priority);
    }
    return priorityQueue;
  }

  const saveList = () => {
    if (props.tasks) {
      localStorage.setItem('taskList', JSON.stringify(props.tasks));
      console.log('Lista guardada en la caché del navegador.');
    } else {
      console.log('No hay una lista de tareas para guardar.');
    }

  };

  const loadList = () => {
    const storedList = localStorage.getItem('taskList');
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      const priorityQueue = convertToPriorityQueue(parsedList);
      props.setTasks(priorityQueue);
      props.setTasksList(priorityQueue.print());
      console.log('Lista cargada desde la caché del navegador.');
    } else {
      console.log('No se encontró ninguna lista en la caché del navegador.');
    }
  };

  return (
    <div className="header">
      <div className='side' />
      <div className="container title">
        Task Manager
      </div>
      <div className='container side'>
        <button onClick={saveList}>
          Save List
        </button>
        <button onClick={loadList}>
          Load List
        </button>
      </div>
    </div>
  )
}