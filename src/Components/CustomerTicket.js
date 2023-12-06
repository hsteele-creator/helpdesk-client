import React from "react";
import "../Css/customerTicket.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTicketById } from "../helperFunctions";
import Nav from "./Nav";
import LetterSquare from "./LetterSquare";

const CustomerTicket = () => {
  const [currentTicket, setCurrentTicket] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getTicketById(id, setCurrentTicket);
  }, []);
  return (
    <>
      <div id="main-customert-div">
        <Nav />

        <div id="customer-ticket-main">
          <div id="customer-nav">
            <button className="btn">Reply</button>
            <button className="btn">Add Note</button>
            <button className="btn">Close</button>
            <button className="btn">Delete</button>
          </div>

          <div id="ticket-edit">
            <div id="ticket-container">
              <div id="main-ticket">
                {currentTicket && (
                  <div className="current-ticket-container">
                    <h2>{currentTicket.subject}</h2>

                    <div className="contact-container">
                      <LetterSquare firstName={currentTicket.contact_first} />
                      <p className="ticket-agent">
                        <span style={{ color: "grey" }}>Created by</span>{" "}
                        {currentTicket.agent}
                      </p>
                    </div>

                    <p>
                      {currentTicket.contact_first} {currentTicket.contact_last}{" "}
                      reported
                    </p>
                    <p>
                      Name : {currentTicket.contact_first}{" "}
                      {currentTicket.contact_last}
                    </p>
                    <p>Email : {currentTicket.email}</p>
                    <p>Phone : {currentTicket.phone}</p>
                    <p>Content : {currentTicket.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div id="edit-ticket-container">
              <h3 id="status-title">{currentTicket?.status}</h3>
              <p>Properties</p>
              <form>
                <select id="type" name="type">
                  Type
                </select>
                <select id="status" name="status">
                  Status
                </select>
                <select id="priority" name="agent">
                  Priority
                </select>
                <select id="agent" name="agent">
                  Agent
                </select>
                <button disabled="true" className="btn-color" id="update-btn">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerTicket;
