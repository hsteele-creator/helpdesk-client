import "../Css/Contacts.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { getContacts } from "../helperFunctions";
import { useCookies } from "react-cookie";
import LetterSqaure from "./LetterSquare";
import { Link } from "react-router-dom";

const Contacts = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    getContacts(cookies.company, setContacts);
  }, []);

  return (
    <>
      <div id="contacts-main">
        <Nav />

        <div id="contacts-holder" className="flex-column">
          <div id="contacts-nav">
            <div id="search-container">
              <input placeholder="search by email"></input>
              <button className="btn-color">Search</button>
            </div>

            <Link to="/add-contact">
              {" "}
              <button className="btn-color">Add Contact</button>
            </Link>

            <LetterSqaure firstName={cookies.firstName} />
          </div>

          <div id="contacts-container">
            {contacts?.map((c) => {
              return <h1>{c.email}</h1>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
