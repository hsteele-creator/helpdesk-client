import React from "react";
import "../Css/Ticket.css";
import msg from "../Images/email.png";
import user from "../Images/agent.png";
import chart from "../Images/bar-chart.png";
import { Link } from "react-router-dom";
import LetterSquare from "./LetterSquare";

const Ticket = ({
  id,
  subject,
  type,
  priority,
  status,
  agent,
  company,
  date,
  description,
  contact_first,
  contact_last,
}) => {
  const colors = {
    Low: "green",
    Medium: "blue",
    High: "yellow",
    Urgent: "red",
  };

  const contactColors = ["#CDEBC3", "#FFD7C2", "#F3F1F1", "#FFF3A8"];
  return (
    <>
      <div className="ticket-container">
        <div className="ticket-left">

          <LetterSquare firstName={contact_first} />

          <div className="ticket-subject-container">
            <Link to={`/tickets/${id}`}>
              <h3 className="ticket-subject">{subject}</h3>
            </Link>
            <div className="ticket-name-container">
              <img className="msg" src={msg} />
              <p>
                {contact_first} {contact_last}
              </p>
            </div>
          </div>
        </div>

        <div className="ticket-right">
          <div className="priority-container flex">
            <div
              style={{
                backgroundColor: colors[priority],
                width: "12px",
                height: "12px",
                margin: "0 10px 0 3px",
              }}
            ></div>
            <p className="ticket-priority">{priority}</p>
          </div>
          <div className="status-container flex">
            <img className="ticket-img " src={chart} />
            <p className="ticket-status">{status}</p>
          </div>
          <div className="agent-container flex">
            <img className="ticket-img " src={user} />
            <p>{agent}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
