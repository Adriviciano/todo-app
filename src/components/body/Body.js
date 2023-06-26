import './Body.css';
import React from 'react';
import Task from '../task/Task.js';

export default function Body(props) {

  const handleDelete = (task) => {
    props.removeTask(task);
  };

  return (
    <div className='body'>
      <div>
        <button className='addButton' onClick={()=>{
        props.modal ? props.setModal(false) : props.setModal(true);
      }}>Add task</button>
      </div>
      <div className='tasksContainer'>
        {props.tasks.map((task, index) => (
          <Task
          key={index}
          name={task}
          onDelete={() => handleDelete(task)}
        />
        ))}
      </div>
    </div>
  )
}