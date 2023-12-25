import "./App.css";
import Header from "./components/Header/Header";
import TodoTask from "./components/TodoTask/TodoTask";
import Todolist from "./components/Todolist/Todolist";
import initialTodolist from "./assets/initialData";
import { useEffect, useReducer, useState } from "react";
import { HandlerContext } from "./contexts/handlerContext";

let count = 4;

function uniqueId() {
  count = count + 1;
  return count;
}

function reducer(todolist, action) {
  switch (action.type) {
    case "add_todo":
      return [...todolist, action.newItem];
    case "delete_todo":
      return todolist.filter((item) => item.id !== action.deleteId);
    case "edit_todo":
      const newTodolist = [...todolist];
      const index = todolist.findIndex((e) => e.id === action.editId);
      newTodolist[index] = { ...action.editTodo };
    default:
  }
}

function App() {
  const [todolist, dispatch] = useReducer(reducer, {}, () => {
    const localTodo = localStorage.getItem("todo");
    if (localTodo === null) {
      return initialTodolist;
    }
    return JSON.parse(localTodo).map((item) => {
      return {
        ...item,
        dueDate: new Date(item.dueDate),
      };
    });
  });
  const [currentYear, setCurrentYear] = useState("2023");
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todolist));
  }, [todolist]);

  const addNewTodo = (newTodo) => {
    const newTodoItem = {
      ...newTodo,
      id: uniqueId(),
    };
    dispatch({
      type: "add_todo",
      newItem: newTodoItem,
    });
  };

  const deleteHandler = (id) => {
    dispatch({
      type: "delete_todo",
      deleteId: id,
    });
  };

  const editHandler = (id, todo) => {
    dispatch({
      type: "edit_todo",
      editId: id,
      editTodo: todo,
    });
  };

  return (
    <HandlerContext.Provider
      value={{
        editHandler: editHandler,
        deleteHandler: deleteHandler,
        addNewTodo: addNewTodo,
      }}
    >
      <div className="App">
        <Header
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
        />
        {isShow ? (
          <TodoTask setIsShow={setIsShow} />
        ) : (
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setIsShow(true)}>Add new todo</button>
          </div>
        )}
        <Todolist currentYear={currentYear} todolist={todolist} />
      </div>
    </HandlerContext.Provider>
  );
}

export default App;
