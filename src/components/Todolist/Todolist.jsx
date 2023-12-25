import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import "./Todolist.css";

function Todolist(props) {
  const todolist = props.todolist;
  const currentYear = props.currentYear;
  const filteredTodo = todolist.filter(
    (item) => item.dueDate.getFullYear() === Number(currentYear)
  );

  return (
    <div className="tdl-container">
      {filteredTodo.map((item) => (
        <TodoItem
          key={item.id}
          deleteHandler={props.deleteHandler}
          editHandler={props.editHandler}
          id={item.id}
          task={item.task}
          isFinished={item.isFinished}
          dueDate={item.dueDate}
        />
      ))}
    </div>
  );
}

export default Todolist;
