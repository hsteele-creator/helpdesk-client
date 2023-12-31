import "../Css/Response.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { handleChange, getTicketResponses } from "../helperFunctions";
import {addResponse} from "../helperFunctions"

const Response = ({ setAllResponses, id, getTicketResponses, content, first, last, agent, type, ticketId, editMode, setResponseOpen }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [response, setResponse] = useState({
    type: type,
    incoming: false,
    date: new Date(),
    ticket_id: ticketId,
    content: "",
    firstName: first,
    lastName: last,
    agent : agent,
  });
  const fullName = first + " " + last;
  const normal = type === "Normal";
  const person = response.incoming === false ? agent : fullName;

  const addResponse = async (response, setResponse) => {
    try {
      const newResponse = await fetch("http://localhost:8000/add-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const data = await newResponse.json();
      setResponse(null);

      getTicketResponses(id, setAllResponses)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className={normal ? "response-container" : "response-container hidden"}
      >
        <p>
          {person} {normal ? "replied" : "added a private note"}
        </p>
        {editMode && (
          <textarea
            onChange={(e) => handleChange(e, response, setResponse)}
            id="content"
            name="content"
            rows="12"
            cols="50"
            className={normal ? "response-content" : "response-content hidden"}
            autoFocus
          ></textarea>
        )}
        {!editMode && <p>{content}</p>}
        
        <p>Thanks, {cookies.company}</p>

        {editMode && (
          <button onClick={() => addResponse(response, setResponseOpen)} className="btn-color">
            Add {normal ? "Reply" : "Note"}
          </button>
        )}
      </div>
    </>
  );
};

export default Response;
