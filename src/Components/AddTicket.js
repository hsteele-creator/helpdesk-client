import React from "react";
import "../Css/AddTicket.css";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { handleChange } from "../helperFunctions";

const AddTicket = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [agents, setAgents] = useState([]);
  const [ticketData, setTicketData] = useState({
    subject: "",
    contact_email: "",
    type: "",
    priority: "",
    status: "",
    agent: "",
    company: cookies.company,
    description: "",
    date: new Date(),
  });

  console.log(ticketData)

  const getAgents = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/agents/${cookies.company}`
      );
      const data = await response.json();
      setAgents(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <>
      <div id="add-ticket-main">
        <Nav />

        <div id="add-ticket-form-container">
          <form className="flex-column">
            <input
              placeholder="subject"
              name="subject"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.subject || ""}
            ></input>
            <input
              placeholder="contact_email"
              name="contact_email"
              type="email"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.contact_email || ""}
            ></input>
            <select
              name="type"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.type || ""}
            >
              <option>Question</option>
              <option>Problem</option>
              <option>Feature Request</option>
              <option>Refund</option>
            </select>
            <select name="status" value={ticketData.subject || ""}>
              <option>Open</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
            <select
              name="priority"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.priority || ""}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
            <select
              name="agent"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.agent || ""}
            >
              {agents?.map((agent) => {
                return (
                  <option>
                    {agent.first_name} {agent.last_name}
                  </option>
                );
              })}
            </select>
            <input
            value={ticketData.description || ""}
              name="description"
              type="textarea"
              placeholder="description"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
            ></input>
            <button>Create Ticket</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTicket;
