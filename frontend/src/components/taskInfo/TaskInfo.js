import './TaskInfo.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Loader from '../loader/Loader';

const TaskInfo = ({ user, remove }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  let { state } = useLocation();
  const id = state.taskName;

  const handleDelete = () => {
    remove(id)
  }

  useEffect(() => {
    const fetchTaskInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${user}`);
        const userInfo = response.data;
        const tasksObject = JSON.parse(userInfo.tasks)
        tasksObject.items.forEach(task => {
          if (task.element === id) {
            setTask(task)
            setLoading(false)
          }
        })
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaskInfo();
  }, [user, id]);

  if (loading) {
    console.log('Loading')
    return (
      <Loader/>
    )
  } else {
    console.log('Loaded: ' + task.element)
    return (
      <>
        <Link to={'/'} >
          <div className='modal-background'></div>
        </Link>
        <div className='modal'>

          <div className='modalTitle'>{task.element}</div>
          <div>
            <div>Priority: {task.priority}</div>
          </div>
          <div className='separator' />
          <Link to={'/'} >
            <button className='modalButton danger' onClick={handleDelete}>
              Delete
            </button>
          </Link>
        </div>
      </>

    );
  }
};

export default TaskInfo;
