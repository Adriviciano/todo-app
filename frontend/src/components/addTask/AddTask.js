import './AddTask.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function AddTask(props) {

  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task === '') {
      alert('La tarea no puede estar vacía')
    } else if (priority < 0) {
      alert('La prioridad debe ser mayor o igual a 0');
    } else {
      props.addTask(task, priority);
      try {
        console.log(JSON.stringify(props.tasks))
        await axios.put(`http://localhost:4000/api/users/${props.user}`, { "tasks": JSON.stringify(props.tasks) })
      } catch (error) {
        console.error(error);
      }
      setTask('');
      setPriority(0);
      navigate('/')
    }
  };

  return (
    <>
      <Link to={'/'} >
        <div className='modal-background'></div>
      </Link>
      <div className='modal'>
        <div className='modalTitle'>Add Task</div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>Name:</div>
            <input
              className='input'
              type="text"
              name="name"
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
          </div>
          <div>
            <div>Priority:</div>
            <input
              className='priority'
              type="number"
              name="name"
              min={0}
              max={9}
              defaultValue={0}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            />
          </div>
          <button className='modalButton' type="submit">
            <Link to={'/'} onClick={handleSubmit}>Submit </Link>
          </button>
        </form>
      </div>
    </>
  )
}