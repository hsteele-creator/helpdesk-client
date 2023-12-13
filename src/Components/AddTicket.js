import React from "react";
import "../Css/AddTicket.css";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { handleChange, getAgents, getContacts } from "../helperFunctions";

const AddTicket = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [ticketData, setTicketData] = useState({
    subject: "",
    contact_email: "",
    type: "Question",
    priority: "Low",
    status: "Open",
    agent: "",
    company: cookies.company,
    description: "",
    date: new Date(),
  });

  useEffect(() => {
    getAgents(cookies.company, setAgents);
    getContacts(cookies.company, setContacts);
  }, []);

  const addTicket = async (e) => {
    e.preventDefault();

    if (ticketData.contact_email !== "" && ticketData.agent !== "") {
      const response = await fetch("http://localhost:8000/add-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      setTicketData({
        subject: "",
        contact_email: "",
        type: "Question",
        priority: "Low",
        status: "Open",
        agent: "",
        company: cookies.company,
        description: "",
        date: new Date(),
      });

      const data = await response.json();

      if (!data.detail) {
        alert("Ticket added succesfully!");
      } else {
        setError(data.detail);
      }
    } else {
      setError("No inputs can be blank");
    }
  };

  return (
    <>
      <div id="add-ticket-main">
        <Nav />

        <div id="add-ticket-form-container" className="flex-center">
          <form
            id="add-ticket-form"
            className="flex-column"
            onSubmit={addTicket}
          >
            <label for="subject">Subject</label>
            <input
              required
              className="add-ticket-input"
              placeholder="subject"
              name="subject"
              id="subject"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.subject || ""}
            ></input>
            <label for="contact_email">Contact Email</label>
            <select
              className="add-ticket-input"
              id="contact_email"
              name="contact_email"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.contact_email || ""}
            >
              <option>--</option>
              {contacts?.map((contact) => {
                return <option>{contact.email}</option>;
              })}
            </select>
            <label for="type">Type</label>
            <select
              className="add-ticket-input"
              id="type"
              name="type"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.type}
            >
              {/* <option>--</option> */}
              <option>Question</option>
              <option>Problem</option>
              <option>Feature Request</option>
              <option>Refund</option>
            </select>
            <label for="status">Status</label>
            <select
              className="add-ticket-input"
              id="status"
              name="status"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.status}
            >
              {/* <option>--</option> */}
              <option>Open</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
            <label for="priority">priority</label>
            <select
              className="add-ticket-input"
              id="priority"
              name="priority"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.priority}
            >
              {/* <option>--</option> */}
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
            <label for="agent">Agent</label>
            <select
              className="add-ticket-input"
              id="agent"
              name="agent"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
              value={ticketData.agent || ""}
            >
              <option>--</option>
              {agents?.map((agent) => {
                return (
                  <option>
                    {agent.first_name} {agent.last_name}
                  </option>
                );
              })}
            </select>
            <label for="description">Description</label>
            <input
              required
              className="add-ticket-input"
              id="descripton"
              value={ticketData.description || ""}
              name="description"
              type="textarea"
              cols="4"
              rows="2"
              onChange={(e) => handleChange(e, ticketData, setTicketData)}
            ></input>
            {error && <p className="error">{error}</p>}
            <button type="submit" id="add-ticket-btn">
              Create Ticket
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTicket;
