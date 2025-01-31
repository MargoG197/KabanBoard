import './index.css';
import FullPageTasks from '../FullPageTask/FullPageTask'
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Task({ task }) {
  const [openFullPage, setOpenFullPage] = useState(false);
  
  return (
        <div className="taskBlock" key={`${task.id}`}>
        <Link className='title' to={`/${task.id}`}>
          {task.name}
        </Link>
        <p>
          {task.description}
          </p>
      {openFullPage && <FullPageTasks task={task} closeFn={setOpenFullPage} />}
      </div>
  )
}

export default Task;