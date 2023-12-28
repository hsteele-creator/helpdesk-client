import "../Css/AddContact.css";
import Nav from "./Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { handleChange } from "../helperFunctions";

const AddContact = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: cookies.company,
  });

  const addContact = async (e) => {
    e.preventDefault();
    try {
      const newContact = await fetch("http://localhost:8000/add-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      setContact();

      const data = await newContact.json()

      if (data.detail) {
        setError(data.detail);
      }

      alert('Contact added succesfully!')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div id="add-contact-main" className="flex">
        <Nav />
        <div id="add-contact-form-container" className="center">
          <h1>Enter contact info below</h1>
          <form onSubmit={addContact} id="add-contact-form">
            <input
              onChange={(e) => handleChange(e, contact, setContact)}
              value={contact?.first_name || ""}
              name="first_name"
              placeholder="first name"
            ></input>
            <input
              onChange={(e) => handleChange(e, contact, setContact)}
              value={contact?.last_name || ""}
              name="last_name"
              placeholder="last name"
            ></input>
            <input
              onChange={(e) => handleChange(e, contact, setContact)}
              value={contact?.email || ""}
              name="email"
              placeholder="email"
            ></input>
            <input
              onChange={(e) => handleChange(e, contact, setContact)}
              value={contact?.phone || ""}
              name="phone"
              placeholder="phone"
            ></input>
            {error && <p>{error}</p>}
            <button className="btn-color">Add Contact</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
