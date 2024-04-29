/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ListItem({ data, getPosts }) {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const userToken = localStorage.getItem("token");

  function editPageNavigation() {
    navigate(`/edit/${data.id}`);
  }

  function deleteItem() {
    setShowModal(true);
  }

  function confirmDelete() {
    axios
      .delete(`https://medicalstore.mashupstack.com/api/medicine/${data.id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        console.log(response);
        getPosts();
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
      });
  }

  return (
    <>
      <tr key={data.id}>
        <td>{data.name}</td>
        <td>{data.company}</td>
        <td>{data.expiry_date}</td>
        <td>
          <button className="btn btn-success me-2" onClick={editPageNavigation}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={deleteItem}>
            Delete
          </button>
        </td>
      </tr>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListItem;
