import './AddTask.css';
import React, { useState } from 'react';

export default function AddTask(props) {

  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === '') {
      alert('La tarea no puede estar vacía')
    } else if (priority < 0) {
      alert('La prioridad debe ser mayor o igual a 0');
    } else {
      props.addTask(task, priority);
      setTask('');
      setPriority(0);
      props.setShow(false);
    }
  };

  return (
    <>
      {props.show && <div className="modal-background"></div>}
      {props.show && (
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
                defaultValue={0}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
              />
            </div>
            <button className='modalButton' type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  )
}