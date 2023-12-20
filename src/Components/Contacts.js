import "../Css/Contacts.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { getContacts, handleFilter } from "../helperFunctions";
import { useCookies } from "react-cookie";
import LetterSqaure from "./LetterSquare";
import { Link } from "react-router-dom";
import Contact from "./Contact";

const Contacts = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [contacts, setContacts] = useState(null);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    getContacts(cookies.company, setContacts);
  }, []);

  const filteredContacts =
    filter === ""
      ? contacts
      : contacts?.filter((c) => c.email.includes(filter));


  return (
    <>
      <div id="contacts-main">
        <Nav />

        <div id="contacts-holder" className="flex-column">
          <div id="contacts-nav">
            <div id="search-container">
              <input
                placeholder="search by email"
                onChange={(e) => handleFilter(e, setFilter)}
              ></input>
              <button className="btn-color">Search</button>
            </div>

            <Link to="/add-contact">
              {" "}
              <button className="btn-color">Add Contact</button>
            </Link>

            <LetterSqaure firstName={cookies.firstName} />
          </div>

          <div id="contacts-container">
            <div>
              <div id="top-contacts-container">
                <p>Contact</p>
                <p className="email-contacts">Email</p>
                <p className="phone-contacts">Phone</p>
              </div>
            </div>
            {filteredContacts?.map((c) => {
              return (
                <Contact
                  id={c.id}
                  firstName={c.first_name}
                  lastName={c.last_name}
                  email={c.email}
                  phone={c.phone}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
