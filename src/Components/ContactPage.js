import "../Css/ContactPage.css";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContactTickets, getContact } from "../helperFunctions";
import user from "../Images/user.png";
import Ticket from "./Ticket";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const { email } = useParams();
  const { id } = useParams();
  const [contactTickets, setContactTickets] = useState(null);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContactTickets(email, setContactTickets);
    getContact(id, setContact);
  }, []);
  return (
    <>
      <div className="contact-page-container">
        <Nav />
        <div className="contac-page-holder">
          <div className="contact-page-btns-container">
            <button>Edit</button>
            <button>Page</button>
          </div>
          <div className="contact-page-top">
            <div className="contact-page-name-container">
              <img className="contact-img" src={user} />
              <p className="contact-page-name">
                {contact?.first_name.toUpperCase()}{" "}
                {contact?.last_name.toUpperCase()}
              </p>
            </div>
            <div className="contact-page-right">
              <Link to={{ pathname: "/add-ticket", search: `?email=${email}` }}>
                <button className="btn-color">Add Ticket</button>
              </Link>
            </div>
          </div>

          {contactTickets?.map((ct) => {
            return (
              <Ticket
                id={ct.id}
                subject={ct.subject}
                priority={ct.priority}
                status={ct.status}
                agent={ct.agent}
                contact_first={ct.contact_first}
                contact_last={ct.contact_last}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
