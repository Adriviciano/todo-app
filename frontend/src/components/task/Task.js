import React from 'react';
import './Task.css';
import { Link } from 'react-router-dom';

export default function Task({ name }) {
  return (
    <>
      <Link to={`/tasks/${name}/info`} state={{ taskName: name }}>
        <div className="task">
          <h3>{name}</h3>
          <div className='taskSpacer'></div>
        </div>
      </Link>
    </>
  );
}
