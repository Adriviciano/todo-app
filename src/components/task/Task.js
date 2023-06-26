import React from 'react';
import './Task.css';
import TaskInfo from '../taskInfo/TaskInfo.js';

function openTask(task) {
  return(
    <TaskInfo task={task} show={true}/>
  )
}

export default function Task({ name, onDelete }) {
  return (
    <div className="task" onClick={() => {openTask(name)}}>
      <h3>{name}</h3>
      <div className='taskSpacer'></div>
      <div className="deleteTask">
        <div></div>
        <button onClick={onDelete}>X</button>
      </div>
    </div>
  );
}