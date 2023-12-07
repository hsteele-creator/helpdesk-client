import "../Css/Response.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Response = ({first, last, agent, type, ticketId}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [response, setResponse] = useState({
        type : type,
        incoming : false,
        date : new Date(),
        ticket_id : ticketId
    })
    const fullName = first + " " + last;
    const normal = type === "Normal";
    const person = response.incoming === false ? agent : fullName
    return (
        <>
        <div className={normal ? "response-container" : "response-container hidden"} >
            <p>{person} {normal ? "replied" : "added a private note"}</p>

            <p>Thanks, {cookies.company}</p>
        </div>
        </>
    )
}

export default Response