import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogoutButton = ({ actions }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await actions.logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return <Button variant="outline-light" 
  className="logoutbutton" 
  onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
