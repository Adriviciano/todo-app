import './Body.css';
import React from 'react';
import Task from '../task/Task.js';
import { Link } from 'react-router-dom';

export default function Body(props) {

  const handleDelete = (task) => {
    props.removeTask(task);
  };

  return (
    <div className='body'>
      <div>
        <Link to='/add' ><button className='addButton'>Add task</button></Link>
      </div>
      <div className='tasksContainer'>
        {props.tasks.map((task, index) => (
          <Task
          key={index}
          name={task}
          onDelete={() => handleDelete(task)}
          user = {props.user}
        />
        ))}
      </div>
    </div>
  )
}