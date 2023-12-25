import React, { useContext } from "react";
import "./TodoTask.css";
import { useState } from "react";
import { HandlerContext } from "../../contexts/handlerContext";

function TodoTask({ setIsShow }) {
  const ctx = useContext(HandlerContext);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const taskHandler = (event) => {
    setTask(event.target.value);
  };

  const dueDateHandler = (event) => {
    setDate(event.target.value);
  };

  const clickHanlder = () => {
    const newTodo = {
      task: task,
      dueDate: new Date(date),
    };

    ctx.addNewTodo(newTodo);
    setIsShow(false);

    setTask("");
    setDate("");
  };

  return (
    <div className="add-container">
      <div className="input-container">
        <div>
          <label>Task</label>
          <input type="text" value={task} onChange={taskHandler} />
        </div>
        <div>
          <label>Due dute</label>
          <input type="date" value={date} onChange={dueDateHandler} />
        </div>
      </div>
      <div className="add-button">
        <button onClick={clickHanlder}>Add</button>
      </div>
      <div className="add-button">
        <button onClick={() => setIsShow(false)}>Cancle</button>
      </div>
    </div>
  );
}

export default TodoTask;
