import React, { useContext, useState } from "react";
import "./TodoItem.css";
import { HandlerContext } from "../../../contexts/handlerContext";

function TodoItem(props) {
  const ctx = useContext(HandlerContext);
  const [checkbox, setCheckbox] = useState(props.isFinished);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [currentDate, setCurrentDate] = useState();
  const task = props.task;
  const dueDate = props.dueDate;
  const date = dueDate.getDate();
  const month = dueDate.getMonth();
  const year = dueDate.getFullYear();

  const resolveDueDate = (date, month, year) => {
    let convertedDate, convertedMonth;

    if (String(date).length === 1) {
      convertedDate = "0" + date;
    }

    if (String(month).length === 1) {
      convertedMonth = "0" + month;
    } else {
      convertedMonth = month;
      convertedDate = date;
    }
    return `${year}-${convertedMonth}-${convertedDate}`;
  };

  const onClickEdit = () => {
    setIsEdit(true);
    setCurrentTask(props.task);
    const dateToSet = resolveDueDate(date, month, year);
    setCurrentDate(dateToSet);
  };

  const onClickDone = () => {
    const editValue = {
      id: props.id,
      task: currentTask,
      dueDate: new Date(currentDate),
      isFinished: checkbox,
    };
    setIsEdit(false);
    ctx.editHandler(props.id, editValue);
  };

  if (isEdit) {
    return (
      <div className="form-control">
        <div className="cb-container">
          <input
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
            type="checkbox"
          />
        </div>
        <div className="tn-container">
          <input
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          ></input>
        </div>
        <div className="dd-container">
          <input
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            type="date"
          ></input>
        </div>
        <div className="ed-container">
          <button onClick={onClickDone}>Done</button>
        </div>
        <div className="dl-container">
          <button onClick={() => setIsEdit(false)}>Cancle</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-control">
        <div className="cb-container">
          <input
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
            type="checkbox"
          />
        </div>
        <div className="tn-container">{task}</div>
        <div className="dd-container">
          {date}/{month}/{year}
        </div>
        <div className="ed-container">
          <button onClick={onClickEdit}>Edit</button>
        </div>
        <div className="dl-container">
          <button onClick={() => ctx.deleteHandler(props.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
