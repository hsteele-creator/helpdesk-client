import "../Css/Register.css";
import { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { handleChange } from "../helperFunctions";

const Register = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [state, setState] = useState("Login");
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    company: "",
  });

  const handleSwitch = (newState) => {
    setState(newState);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/${state}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    setUserData({});

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else if (data === "User does not exist or password is incorrect") {
      setError(data);
    } else {
      setCookie("firstName", data.first_name);
      setCookie("lastName", data.last_name);
      setCookie("company", data.company);
      setCookie("AuthToken", data.token);
    }
  };

  return (
    <>
      <div id="main-register-container">
        <form
          id="register-form"
          className="flex-column center"
          onSubmit={handleSubmit}
        >
          <h1>{state} below</h1>
          {state === "Register" && (
            <input
              required
              value={userData.first_name?.replace(/[^A-Za-z]/gi, "") || ""}
              onChange={(e) => handleChange(e, userData, setUserData)}
              name="first_name"
              placeholder="first name"
            ></input>
          )}
          {state === "Register" && (
            <input
              required
              value={userData.last_name?.replace(/[^A-Za-z]/gi, "") || ""}
              onChange={(e) => handleChange(e, userData, setUserData)}
              name="last_name"
              placeholder="last name"
            ></input>
          )}
          <input
            required
            value={userData.email || ""}
            onChange={(e) => handleChange(e, userData, setUserData)}
            placeholder="email"
            name="email"
            type="email"
          ></input>
          <input
            required
            value={userData.password || ""}
            onChange={(e) => handleChange(e, userData, setUserData)}
            placeholder="password"
            name="password"
            type="password"
          ></input>
          {state === "Register" && (
            <input
              required
              onChange={(e) => handleChange(e, userData, setUserData)}
              value={userData.company?.replace(/[^A-Za-z]/gi, "") || ""}
              placeholder="company"
              name="company"
            ></input>
          )}
          {state === "Login" ? (
            <p className="switch-state">
              Don't have an account yet?{" "}
              <span onClick={() => handleSwitch("Register")}>signup here</span>
            </p>
          ) : (
            <p className="switch-state">
              Already have an account?{" "}
              <span onClick={() => handleSwitch("Login")}>login here</span>
            </p>
          )}
          {error && <p className="error">{error}</p>}
          <button className="btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
