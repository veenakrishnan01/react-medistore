import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function NavBar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function logout() {
    setShowModal(true);
  }

  function confirmLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-light bg-secondary justify-content-between">
        <Link to="/lists" className="navbar-brand">
          MedCore
        </Link>
        <div>
          <Link to="/create" className="btn btn-warning me-2">
            {" "}
            Add{" "}
          </Link>
          <button className="btn btn-primary" onClick={logout}>
            {" "}
            Logout{" "}
          </button>
        </div>
      </nav>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;

// import { Link, useNavigate } from "react-router-dom";

// function NavBar() {
//   const navigate = useNavigate();

//   function logout() {
//     const confirmed = window.confirm("Are you sure you want to log out?");
//     if (confirmed) {
//       localStorage.removeItem("token");
//       navigate("/login");
//     }
//   }

//   return (
//     <nav className="navbar navbar-light bg-secondary justify-content-between">
//       <Link to="/lists" className="navbar-brand">
//         MedCore
//       </Link>
//       <div>
//         <Link to="/create" className="btn btn-warning me-2">
//           {" "}
//           Add{" "}
//         </Link>
//         <button className="btn btn-primary" onClick={logout}>
//           {" "}
//           Logout{" "}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
