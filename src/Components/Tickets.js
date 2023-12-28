import "../Css/Tickets.css";
import React, { useState } from "react";
import Nav from "./Nav";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTickets, handleFilter } from "../helperFunctions";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Ticket from "./Ticket";

const Dashboard = () => {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tickets, setTickets] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = new URLSearchParams(location.search).get("filter");

  useEffect(() => {
    getTickets(cookies.company, setTickets);
  }, []);

  const filteredTickets =
    filterValue === ""
      ? tickets
      : tickets?.filter((t) =>
          t.subject.toLowerCase().includes(filterValue.toLowerCase())
        );
  const specificTickets =
    myParam === null
      ? filteredTickets
      : filteredTickets?.filter((t) => t.status === myParam);

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

            <Link to="/add-contact">
              <button className="btn-light">Add Contact</button>
            </Link>

            <div id="search-container">
              <input
                id="search"
                placeholder="Search By Title"
                onChange={(e) => handleFilter(e, setFilterValue)}
              ></input>
              <button className="btn-color">Search</button>
            </div>
          </div>

          <div id="agent-info-container" className="flex-center">
            <p>{cookies.firstName?.slice(0, 1).toUpperCase()}</p>
          </div>
        </div>

        <div id="dashboard-tickets">
          {specificTickets?.map((t) => {
            return (
              <Ticket
                id={t.id}
                subject={t.subject}
                type={t.type}
                priority={t.priority}
                status={t.status}
                agent={t.agent}
                company={t.company}
                date={t.date}
                description={t.description}
                contact_first={t.contact_first}
                contact_last={t.contact_last}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
