import "../Css/Dashboard.css";
import React from "react";
import Nav from "./Nav";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  console.log(cookies);
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
            <button className="btn-light">Add Ticket</button>

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

        <div id="dashboard-tickets"></div>
      </div>
    </div>
  );
};

export default Dashboard;
