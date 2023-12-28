import "../Css/ContactPage.css";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContactTickets, getContact } from "../helperFunctions";
import user from "../Images/user.png";
import Ticket from "./Ticket";
import { Link, Navigate } from "react-router-dom";
const ContactPage = () => {
  const { email } = useParams();
  const { id } = useParams();
  const [contactTickets, setContactTickets] = useState(null);
  const [contact, setContact] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    getContactTickets(email, setContactTickets);
    getContact(id, setContact);
  }, []);

  console.log(contact)

  const deleteTicket = async () => {
    try {
      const response = await fetch(`http://localhost:8000/contact/${email}`, {
        method: "DELETE",
      });
      setDeleteMode(false);
      setRedirect(true)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="contact-page-container">
        {redirect && <Navigate to="/tickets"/>}
        <Nav />
        <div className="contac-page-holder">
          <div className="contact-page-btns-container">
            <button className="btn-light">Edit</button>
            <button
              className="btn-light"
              onClick={() => setDeleteMode(!deleteMode)}
            >
              Delete
            </button>
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
      {deleteMode && (
        <div className="center delete-div">
          <button className="delete-btn">X</button>
          <p>Are you sure you want to delete this contact?</p>
          <button className="btn-light" onClick={deleteTicket}>
            Yes{" "}
          </button>
        </div>
      )}
    </>
  );
};

export default ContactPage;
