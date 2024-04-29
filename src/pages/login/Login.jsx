/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("token");
    if (user) {
      navigate("/lists");
    }
  }, []);

  function emailOnChangeHandler(event) {
    setEmail(event.target.value);
  }
  function passwordOnChangeHandler(event) {
    setPassword(event.target.value);
  }
  function submitFormHandler(event) {
    event.preventDefault();

    if (!email && !password) {
      alert("Please enter your credentials");
      return;
    }

    let formData = {
      email: email,
      password: password,
    };

    axios
      .post("https://medicalstore.mashupstack.com/api/login", formData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/lists");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.errors);
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            className="form-control"
            onChange={emailOnChangeHandler}
            type="email"
            name="email"
            id="inputEmail"
            value={email}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            onChange={passwordOnChangeHandler}
            type="password"
            name="password"
            id="inputPassword"
            value={password}
            required={true}
          />
        </div>

        <button className="btn btn-primary mb-3" onClick={submitFormHandler}>
          Login
        </button>

        <br />

        <Link to="/signup"> Don't have an account? Sign Up! </Link>
      </form>
    </div>
  );
}

export default Login;
