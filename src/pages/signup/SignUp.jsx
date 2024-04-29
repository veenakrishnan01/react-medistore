import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("token");
    if (user) {
      navigate("/lists");
    }
  }, []);

  function userNameOnChangeHandler(event) {
    setUsername(event.target.value);
  }
  function emailOnChangeHandler(event) {
    setEmail(event.target.value);
  }
  function passwordOnChangeHandler(event) {
    setPassword(event.target.value);
  }
  function confirmPasswordOnChangeHandler(event) {
    setConfirmPassword(event.target.value);
  }
  function submitFormHandler(event) {
    event.preventDefault();

    if (!username && !email && !password && !confirmpassword) {
      alert("Please fill all the fields");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    let formData = {
      name: username,
      email: email,
      password: password,
      password_confirmation: confirmpassword,
    };

    axios
      .post("https://medicalstore.mashupstack.com/api/register", formData)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.errors.email);
      });

    console.log(formData);
  }
  return (
    <div>
      <h1>SignUp</h1>

      <form>
        <div className="mb-3">
          <label htmlFor="inputUserName" className="form-label">
            Username
          </label>
          <input
            className="form-control"
            onChange={userNameOnChangeHandler}
            type="text"
            name="username"
            id="inputUserName"
            value={username}
            required
          />
        </div>

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
        <div className="mb-3">
          <label htmlFor="inputConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            className="form-control"
            onChange={confirmPasswordOnChangeHandler}
            type="password"
            name="confirmpassword"
            id="inputConfirmPassword"
            value={confirmpassword}
            required={true}
          />
        </div>
        <br />
        <button className="btn btn-primary mb-3" onClick={submitFormHandler}>
          Register
        </button>

        <br />
        <Link to="/login"> Already have an account? Login ! </Link>
      </form>
    </div>
  );
}

export default SignUp;
