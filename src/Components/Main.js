import "../Css/Main.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { getTickets } from "../helperFunctions";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    getTickets(cookies.company, setTickets);
  }, []);

  console.log(tickets);

  return (
    <>
      <div id="main-container">
        <Nav />

        <div id="homepage-container">
          <div id="main-filter-container">
            <Link to={{ pathname: "/tickets", search: "?filter=Pending" }}>
              <div className="filter-tickets">
                <p>Pending</p>
              </div>
            </Link>
            <Link to={{ pathname: "/tickets", search: "?filter=Open" }}>
              <div className="filter-tickets">
                <p>Unresolved</p>
              </div>
            </Link>
            <Link to={{ pathname: "/tickets", search: "?filter=Closed" }}>
              <div className="filter-tickets">
                <p>Closed</p>
              </div>
            </Link>
          </div>
          <div id="main-bottom-container">
            <div id="todos-container">
              <p>To-do</p>
              <div id="add-todo-container">
                <button>+</button>
                <input placeholder="Add a to-do"></input>
              </div>
            </div>

            <div id="recent-tickets-container"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
