import "../Css/Todo.css";
import { useState } from "react";

const Todo = ({ getTodos, id, name, completed }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTodo, setNewTodo] = useState(name);

  const editTodo = async () => {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body : JSON.stringify({name : newTodo})
    });

    const data = await response.json()

    setEditMode(false)
    getTodos();
  };

  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });

      getTodos()

    } catch(e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="todo-container">
        {!editMode && <p>{name}</p>}
        {editMode && <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo}></input>}
        {!editMode && (
          <button onClick={() => setEditMode(!editMode)}>Edit</button>
        )}
        {editMode && <button onClick={editTodo}>Update Todo</button>}
        <button onClick={deleteTodo}>Delete</button>
      </div>
    </>
  );
};

export default Todo;
