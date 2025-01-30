import "./index.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../../App.css';
 import user from '../../img/user-avatar.svg';
import arrow from '../../img/arrow-down.svg';
import { userMock, dataMock} from '../../App.data.js';



const FullPageTask = () => {

  // const options = ["Backlog", "Ready", "In Progress", "Finished"]
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sessionTasks, setSessionTasks] = useState(dataMock)
  const [activeTasks, setActiveTasks] = useState(0);
  const [finished, setFinished] = useState(0);



  ///выводим на страницу все объекты из localestorage при первом рендере страницы 
  // useEffect(
  //   function setTasks() {
  //     const tempTasks = sessionTasks; 
  //     const keys = Object.keys(localStorage);

  //     tempTasks.forEach(i => {
  //       i.issues.forEach(issue => {

  //         if (!keys.includes(`${issue.id}`)) {
  //           const itemToLocaleStorage = {
  //             name: issue.name,
  //             description: issue.description,
  //             id: issue.id,
  //             title: i.title,
  //           }
  //           localStorage.setItem(issue.id, JSON.stringify(itemToLocaleStorage))
  //         }
  //       })
  //     })
  //     tempTasks.forEach(i => i.issues = [])
  //      keys.forEach(key => {
  //        const newTask = JSON.parse(localStorage.getItem(`${key}`));
  //          tempTasks.forEach(i => {
  //            if (i.title === newTask.title) {
  //              if (!i.issues.find(i => i.id === newTask.id)) {
  //               i.issues.push(
  //         {
  //           id: newTask.id,
  //           name: newTask.name,
  //           description: newTask.description
  //         }) 
  //         }
  //       } 
  //     })
  //      })
  //   }

  // , [sessionTasks])
  



  function handleArrowClick() {
    if (showUserMenu) {
      setShowUserMenu(false)
    } else {
      setShowUserMenu(true)
    }
  }

  useEffect(
    () => {
     let active = 0;
    let finish = 0;
    
    sessionTasks.forEach(i => {
      if (i.title === 'Finished') {
       finish += i.issues.length
      } else if (i.title === 'Backlog'){
        active +=i.issues.length
     }
    })
    setActiveTasks(active);
    setFinished(finish)
  
  }, [sessionTasks])
  const location = useLocation();
  const number = location.pathname.slice(1);
  const task = JSON.parse(localStorage.getItem(number));

  function handleArrowClick() {
    if (showUserMenu) {
      setShowUserMenu(false)
    } else {
      setShowUserMenu(true)
    }
  }

  function closeFn() {}
  return (
    <div className="App roboto-font">
      <header className="App-header">
        <p className="App-header-title">Awesome Kanban Board</p>
        <div className="user-avatar" onClick={handleArrowClick}>
          <img src={user} alt="user-avatar" />
          <img
            src={arrow}
            alt="arrow"
            className={showUserMenu ? "rotate" : ""}
          />
        </div>
      </header>

      <div className="content">
        <div className="fullPageTaskMainDiv">
          <p className="title">{task.name}</p>
          <p>{task.description}</p>
          <div
            className="x"
            onClick={(e) => {
              closeFn(false);
              e.stopPropagation();
            }}
          ></div>
        </div>
      </div>
      <footer className="App-footer">
        <div className="footer-part">
          <p>Active tasks: {activeTasks}</p>
          <p>Finished tasks: {finished}</p>
        </div>
        <div className="footer-part">
          {`Kanban board by ${userMock.name} ${userMock.lastName}, 2025`}
        </div>
      </footer>
    </div>
  );
};

export default FullPageTask;
