import React from "react";
import { NavLink } from "react-router-dom";
import dashboard from "../Images/white-dashboard.png"
import ticket from "../Images/white-ticket.png"
import contacts from "../Images/white-contact.png"
import "../Css/Nav.css"


const Nav = () => {
    return (
        <>
        <div id="nav-container">

            <div id="nav-links-container">
            <NavLink to="/"><img src={dashboard} /></NavLink>
            <NavLink to="/tickets"><img src={ticket} /></NavLink>
            <NavLink to="/contacts"><img src={contacts} /></NavLink>
            {/* <NavLink to="/solutions">Solutions</NavLink> */}
            </div>



        </div>
        </>
    )
}

export default Nav