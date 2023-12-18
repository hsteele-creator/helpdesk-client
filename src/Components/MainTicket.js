import "../Css/MainTicket.css";
import LetterSquare from "./LetterSquare";
import { Link } from "react-router-dom";

const MainTicket = ({ id, firstName, lastName, subject }) => {
  return (
    <>
    <Link to={`/tickets/${id}`}>
      <div className="main-ticket-container">
        <LetterSquare firstName={firstName} />
        <p>
          {firstName} {lastName} : {subject}{" "}
        </p>
      </div>
      </Link>
    </>
  );
};

export default MainTicket;
