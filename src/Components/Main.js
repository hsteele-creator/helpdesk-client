import "../Css/Main.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { getTickets, handleChange, getTodos } from "../helperFunctions";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import MainTicket from "./MainTicket";
import Todo from "./Todo";

const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tickets, setTickets] = useState(null);
  const [todo, setTodo] = useState({
    name: "",
    completed: false,
    company: cookies.company,
  });

  const [todos, setTodos] = useState(null);

  useEffect(() => {
    getTodos(cookies.company, setTodos);
    getTickets(cookies.company, setTickets);
  }, []);

  const pending = tickets?.filter(t => t.status === "Pending");
  const unresolved = tickets?.filter(t => t.status === "Open");
  const closed= tickets?.filter(t => t.status === "Closed");


  const addTodo = async (state) => {
    try {
      const response = await fetch("http://localhost:8000/add-todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });

      setTodo({
        name: "",
        completed: false,
        company: cookies.company,
      });

      const data = await response.json();
      getTodos(cookies.company, setTodos)
    } catch (e) {
      console.error(e);
    }
  };





  return (
    <>
      <div id="main-container">
        <Nav />

        <div id="homepage-container">
          <div id="main-filter-container">
            <Link to={{ pathname: "/tickets", search: "?filter=Pending" }}>
              <div className="filter-tickets">
                <p>Pending</p>
                <p className="ticket-total">{pending?.length}</p>
              </div>
            </Link>
            <Link to={{ pathname: "/tickets", search: "?filter=Open" }}>
              <div className="filter-tickets">
                <p>Unresolved</p>
                <p className="ticket-total">{unresolved?.length}</p>
              </div>
            </Link>
            <Link to={{ pathname: "/tickets", search: "?filter=Closed" }}>
              <div className="filter-tickets">
                <p>Closed</p>
                <p className="ticket-total">{closed?.length}</p>
              </div>
            </Link>
          </div>
          <div id="main-bottom-container">
            <div id="todos-container">
              <div id="todos-top">
                <p>To-do</p>
                <div id="add-todo-container">
                  <button onClick={addTodo}>+</button>
                  <input
                    value={todo.name}
                    name="name"
                    placeholder="Add a to-do"
                    onChange={(e) => {
                      handleChange(e, todo, setTodo);
                    }}
                  ></input>
                </div>
              </div>
              <div id="todos-bottom">
                    {todos?.map(t => {
                        return <Todo getTodos={getTodos} name={t.name} id={t.id} completed={t.completed}/>
                    })}
              </div>
            </div>

            <div id="recent-tickets-container">
              <h2>Recent Tickets</h2>
              {tickets?.slice(0, 5).map((t) => {
                return (
                  <MainTicket
                    subject={t.subject}
                    id={t.id}
                    firstName={t.contact_first}
                    lastName={t.contact_last}
                  />
                );
              })}
              <Link to="/tickets">
                <button id="view-tickets-btn" className="btn-color">
                  {" "}
                  View All Tickets
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
