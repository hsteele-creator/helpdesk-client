import React from "react"
import "../Css/Ticket.css"

const Ticket = ({subject, type, priority, status, agent, company, date, description, contact_first, contact_last}) => {
    return (
        <div id="ticket-container">
        <h1>{subject}</h1>
        <p>{contact_first} {contact_last}</p>
        <p>{agent}</p>
        <p>{priority}</p>
        <p>{status}</p>
        </div>
    )
}

export default Ticket