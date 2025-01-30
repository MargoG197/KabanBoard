import { useEffect, useState } from "react";
import "./index.css";
import Task from "../Task/Task.jsx";
import InputOptions from "../InputOptions/InputOptions.jsx";


function TasksBlock({ header, tasks, currentTasks, setTask, options, id }) {


  const [clicked, setClicked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [openInpit, setOpenInput] = useState(false);
  const [openInpitOptions, setOpenInputOptions] = useState(false);
  const [inpitOptions, setInputOptions] = useState([]);
  const [choiceMade, setChoiceMade] = useState();
  const [buttonActive, setButtonActive] = useState(false);

  ////отображаем на странице внесенные таски
  function setTasks(index) {
    const tempTasks = tasks;
    const newTask = JSON.parse(localStorage.getItem(`${index}`));
    tempTasks.forEach((i) => {
      if (i.title === newTask.title)
        i.issues.push({
          id: newTask.id,
          name: newTask.name,
          description: newTask.description,
        });
    });
    setTask(tempTasks)
  }

  function transferTask() {
    const tempTasks = [];
    tasks.forEach(i => tempTasks.push(i));
    if (tempTasks[id - 1].title === options[id - 1]) {
      const theIssue = tempTasks[id - 1].issues.find(issue => Number(issue.id) === choiceMade);
      tempTasks[id].issues.push(theIssue)
        const item = {
          name: theIssue.name,
          description: theIssue.description,
          id: theIssue.id,
          title: options[id],
        }
     localStorage.setItem(choiceMade, JSON.stringify(item))
      const arrWithRemovedIndex = tempTasks[id - 1].issues.filter(i => i.id !== choiceMade);
      tempTasks[id - 1].issues = arrWithRemovedIndex;
       setOpenInput(false)
        setButtonActive(false)
    } 
    setTask(tempTasks)
  }
  

  function clickFunction() {
    if (id === 0) {
      if (clicked === false) {
        setClicked(true);
      } else {
        if (disabled) {
        } else {
          setClicked(false);
          setTasks(currentIndex);
          setCurrentIndex(currentIndex + 1);
          setDisabled(true)
        }
      }
    } else {
      if (openInpit === true) {
        setOpenInput(false)
        setButtonActive(false)
      } else {
        setOpenInput(true)
        const arr = [];
      if (tasks[id - 1].issues && tasks[id - 1].issues.length > 0) {
        tasks[id - 1].issues.forEach(i => arr.push([Number(i.id), i.name]))
      }
      setInputOptions(arr)
    }
      } 
  }

  function calcLastIndex() {
    const lastIndex = tasks.reduce((a, b) => a + b.issues.length, 0);
    setCurrentIndex(lastIndex+1);
  }

  useEffect(() => {
    calcLastIndex();
  });

  function handleChange(value, ind) {
    ///не сохраняем данные если длинна сообщения меньше 5 символов
    if (value.length >= 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    ///создаем объект и запоминаем его в localStorage
    const item = {
      name: value.slice(0, 15),
      description: value,
      id: ind,
      title: "Backlog",
    };
    if (!item.name.length === 0) {
    } else {
      localStorage.setItem(item.id, JSON.stringify(item));
    }
  }  

  return (
    <div className="taskskBlock" key={id}>
      <p>{header}</p>
      <div className="taskBlockContent">
        {currentTasks && currentTasks[0].issues.length > 0 &&
          currentTasks[0].issues.map((task) => <div key={`${task.id + id + header}`}><Task task={task} /></div>)
        }
        {clicked && (
          <input
            key={currentIndex}
            className="input"
            onChange={(e) => handleChange(e.target.value, currentIndex)}
          ></input>
        )}
      </div>
      {openInpit && inpitOptions.length > 0 &&
        <InputOptions options={inpitOptions} clicked={openInpitOptions} setClicked={setOpenInputOptions} choiceMade={choiceMade} setChoiceMade={setChoiceMade} setButtonActive={setButtonActive}
        />
      }      
      <div className="buttonsDiv">
        {id===0
          &&
          <button
          onClick={clickFunction}
          className={`button ${!clicked ? "add" : "submit"}`}
          disabled={clicked && disabled ? "disabled" : ""}
        >
          {clicked ? "Submit" : "+Add card"}
        </button>
        }
        {clicked && (
          <button className={`button`} onClick={() => { setClicked(false); setDisabled(true);  localStorage.removeItem(currentIndex)}}>
            Close
          </button>
        )}
        {id !== 0
          &&
          <button
            onClick={clickFunction}
            className={`button ${!clicked ? "add" : "submit"}`}
            disabled={clicked && disabled ? "disabled" : ""}
        >
          {openInpit && inpitOptions.length > 0 ? "Cancel" : "+Add card"}
        </button>
        }
         {buttonActive && <button className="button" onClick={transferTask}>Save</button>}
      </div>
    </div>
  );
}

export default TasksBlock;
