import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contacts from "./Components/Contacts";
import Register from "./Components/Register";
import Tickets from "./Components/Tickets";
import AddTicket from "./Components/AddTicket";
import CustomerTicket from "./Components/CustomerTicket";
import AddContact from "./Components/AddContact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/add-ticket" element={<AddTicket />} />
        <Route path="add-contact" element={<AddContact />} />
        <Route path="/tickets/:id" element={<CustomerTicket />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
