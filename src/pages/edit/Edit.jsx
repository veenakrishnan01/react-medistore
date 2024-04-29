/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";

function Edit() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [expiryDate, setExpiryDate] = useState();

  const userToken = localStorage.getItem("token");

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchData();
    }
  }, []);

  function fetchData() {
    axios
      .get(`https://medicalstore.mashupstack.com/api/medicine/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setCompany(response.data.company);
        setExpiryDate(response.data.expiry_date);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function nameOnChangeHandler(event) {
    setName(event.target.value);
  }
  function companyOnChangeHandler(event) {
    setCompany(event.target.value);
  }
  function expiryDateOnChangeHandler(event) {
    setExpiryDate(event.target.value);
  }
  function submitFormHandler(event) {
    event.preventDefault();

    if (!name || !company || !expiryDate) {
      alert("Please fill in all fields.");
      return;
    }

    let formData = {
      name: name,
      company: company,
      expiry_date: expiryDate,
    };
    axios
      .post(
        `https://medicalstore.mashupstack.com/api/medicine/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/lists");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <NavBar />
      <div>
        <h1>Edit</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Medicine Name
            </label>

            <input
              className="form-control"
              onChange={nameOnChangeHandler}
              type="text"
              id="inputName"
              value={name}
              required={true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputCompanyName" className="form-label">
              Company Name
            </label>
            <input
              className="form-control"
              onChange={companyOnChangeHandler}
              type="text"
              id="inputCompanyName"
              value={company}
              required={true}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputCalender" className="form-label">
              Expiry Date
            </label>
            <input
              className="form-control"
              onChange={expiryDateOnChangeHandler}
              type="date"
              id="inputCalender"
              value={expiryDate}
              required={true}
            />
          </div>
          <button className=" btn btn-warning" onClick={submitFormHandler}>
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default Edit;
