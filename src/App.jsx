import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Create from "./pages/create/Create";
import Lists from "./pages/lists/Lists";
import NoPageFound from "./pages/noPageFound/NoPageFound";
import Edit from "./pages/edit/Edit";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const isAuthenticated = () => {
    let user = localStorage.getItem("token");
    return user ? true : false;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/lists" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </>
    // </Router>
  );
}

export default App;
