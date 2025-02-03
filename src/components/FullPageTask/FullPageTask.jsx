import "./index.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../App.css";
import user from "../../img/user-avatar.svg";
import arrow from "../../img/arrow-down.svg";
import { userMock, dataMock } from "../../App.data.js";
import { useNavigate } from "react-router-dom";
import pencile from "./../../img/small_pencile.svg";
import UserMenu from '../UserMenu/UserMenu.jsx';

const FullPageTask = () => {

  const [showUserMenu, setShowUserMenu] = useState(false);
  const sessionTasks = dataMock;
  const [activeTasks, setActiveTasks] = useState(0);
  const [finished, setFinished] = useState(0);
  const [openInput, setOpenInput] = useState(false);


  const navigate = useNavigate();

  function handleArrowClick() {
    if (showUserMenu) {
      setShowUserMenu(false);
    } else {
      setShowUserMenu(true);
    }
  }

  useEffect(() => {
    let active = 0;
    let finish = 0;

    sessionTasks.forEach((i) => {
      if (i.title === "Finished") {
        finish += i.issues.length;
      } else if (i.title === "Backlog") {
        active += i.issues.length;
      }
    });
    setActiveTasks(active);
    setFinished(finish);
  }, [sessionTasks]);
  const location = useLocation();
  const number = location.pathname.slice(1);
  const task = JSON.parse(localStorage.getItem(number));


  function fixText() {
    if (openInput === true) {
      setOpenInput(false)
    } else {
      setOpenInput(true) 
    }
  }

  function handleChange(value) {

    ///создаем объект и запоминаем его в localStorage
    const item = {
      name: task.name,
      description: value,
      id: task.id,
      title: task.title,
    };
  
      localStorage.setItem(item.id, JSON.stringify(item));
    
  } 

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
      {showUserMenu && <UserMenu />}
      <div className="content">
        {task ? (
          <div className="fullPageTaskMainDiv">
            <div className="taskContainer">
              <div className="taskText">
                <h1 className="titleFullPage">{task.name}</h1>
                {openInput ? <textarea type="text" className="textInput"
                  onChange={e => handleChange(e.currentTarget.value)}
               defaultValue={task.description}/> : task.description.length === 0 ? (<p className="mainText">This task has no description</p>): (<p className="mainText">{task.description}</p>) }
              </div>
              <div className="pencile">
                <img src={pencile} alt="" onClick={fixText} />
              </div>
            </div>
            <div
              className="x"
              onClick={() => {
                navigate(-1);
              }}
            ></div>
          </div>
        ) : (
          <h1 className="noTask">
            It seems like there is no task by that number
          </h1>
        )}
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
