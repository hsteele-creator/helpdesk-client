import "../Css/Tickets.css";
import React, { useState } from "react";
import Nav from "./Nav";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {getTickets} from "../helperFunctions";

import Ticket from "./Ticket";

const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    getTickets(cookies.company, setTickets);
  }, []);

  console.log(tickets)

  return (
    <div id="dashboard-main">
      <Nav />
      <div id="dashboard-right" className="flex-column">
        <div id="dashboard-top">
          <div id="sort-container" className="flex-center">
            <p>Sort By : </p>
            <select></select>
          </div>

          <div id="dashboard-top-middle">
            <Link to="/add-ticket">
              <button className="btn-light">Add Ticket</button>
            </Link>

            <button className="btn-light">Add Contact</button>

            <div id="search-container">
              <input id="search"></input>
              <button className="btn-color">Search</button>
            </div>
          </div>

          <div id="agent-info-container" className="flex-center">
            <p>{cookies.firstName.slice(0, 1).toUpperCase()}</p>
          </div>
        </div>

        <div id="dashboard-tickets">
          {tickets?.map(t => {
            return <Ticket id={t.id} subject={t.subject} type={t.type} priority={t.priority} status={t.status} agent={t.agent} company={t.company} date={t.date} description={t.description}contact_first={t.contact_first} contact_last={t.contact_last} />
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
