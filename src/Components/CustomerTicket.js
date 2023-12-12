import React from "react";
import "../Css/customerTicket.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import LetterSquare from "./LetterSquare";
import { getAgents, handleChange, getTicketById, updateTicketProperties, getTicketResponses } from "../helperFunctions";
import { useCookies } from "react-cookie";
import Response from "./Response";

const CustomerTicket = () => {
  const [currentTicket, setCurrentTicket] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [disabled, setDisabled] = useState(true);
  const [responseOpen, setResponseOpen] = useState(null)
  const [agents, setAgents] = useState(null);
  const { id } = useParams();
  const [allResponses, setAllResponses] = useState(null)

  const types = ["Question", "Problem", "Feature Request", "Refund"];
  const status = ["Closed", "Open", "Pending", "Resolved"];
  const priority = ["Low", "Medium", "High", "Urgent"];


  useEffect(() => {
    getTicketById(id, setCurrentTicket);
    getAgents(cookies.company, setAgents);
    getTicketResponses(id, setAllResponses);
  }, []);



  return (
    <>
      <div id="main-customert-div">
        <Nav />

        <div id="customer-ticket-main">
          <div id="customer-nav">
            <button className="btn-color" onClick={() => setResponseOpen('Normal')}>Reply</button>
            <button className="btn-color" onClick={() => setResponseOpen('Hidden')}>Add Note</button>
            <button className="btn-color">Close</button>
            <button className="btn-color">Delete</button>
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
              {allResponses?.map(r => {
                return <Response editMode={false} first={r.firstName} agent={r.agent} type={r.type} ticketId={r.ticketId}/>
              })}
              {responseOpen === "Normal" && <Response setResponseOpen={setResponseOpen} editMode={true} first={currentTicket.contact_first} last={currentTicket.contact_last} agent={currentTicket.agent} type={"Normal"} ticketId={currentTicket.id} />}
              {responseOpen === "Hidden" &&  <Response setResponseOpen={setResponseOpen} editMode={true} first={currentTicket.contact_first} last={currentTicket.contact_last} agent={currentTicket.agent} type={"Hidden"} ticketId={currentTicket.id} />}
            </div>

            <div id="edit-ticket-container">
              <h3 id="status-title">{currentTicket?.status}</h3>
              <p>Properties</p>
              <form onSubmit={(e) => updateTicketProperties(e, currentTicket)}>
                <select
                  id="type"
                  name="type"
                  onChange={(e) =>
                    handleChange(e, currentTicket, setCurrentTicket)
                  }
                >
                  {types.map((t) => {
                    return (
                      <option selected={t === currentTicket?.type}>{t}</option>
                    );
                  })}
                </select>
                <select
                  id="status"
                  name="status"
                  onChange={(e) =>
                    handleChange(e, currentTicket, setCurrentTicket)
                  }
                >
                  {status.map((s) => {
                    return (
                      <option selected={s === currentTicket?.status}>
                        {s}
                      </option>
                    );
                  })}
                </select>
                <select
                  id="priority"
                  name="priority"
                  onChange={(e) =>
                    handleChange(e, currentTicket, setCurrentTicket)
                  }
                >
                  {priority.map((p) => {
                    return (
                      <option selected={p === currentTicket?.priority}>
                        {p}
                      </option>
                    );
                  })}
                </select>
                <select
                  id="agent"
                  name="agent"
                  onChange={(e) =>
                    handleChange(e, currentTicket, setCurrentTicket)
                  }
                >
                  {agents?.map((a) => {
                    return (
                      <option
                        selected={
                          a.firstName + " " + a.last_name ===
                          currentTicket?.agent
                        }
                      >
                        {a.first_name} {a.last_name}
                      </option>
                    );
                  })}
                </select>
                <button className="btn-color" id="update-btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerTicket;
