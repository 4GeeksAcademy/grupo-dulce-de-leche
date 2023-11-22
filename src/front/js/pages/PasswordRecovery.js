import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import recipes from "../../img/recipes.png";

export const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + "/passwordrecovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Password reset link sent successfully
        setResetLinkSent(true);
        setShowSuccessAlert(true); // Mostrar la alerta de éxito
        setShowErrorAlert(false); // Ocultar la alerta de error
      } else if (response.status === 404) {
        // Email not recognized
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      } else {
        // Handle other errors
        console.error("Password reset request failed:", response.statusText);
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row principal">
        {/* Columna izquierda */}
        <div className="col formulario-forgot">
          <div className="row pb-5">
            <div className="col-1"></div>
            <div className="col-1">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div className="col-10">
              <div className="back-login">
                {" "}
                <Link to="/login">Back to login</Link>{" "}
              </div>
            </div>
          </div>
          <h2 className="recovery-title">Forgot Your Password?</h2>
          <p className="recovery-instructions">
            Please enter your email address. We will send you a link to reset
            your password.
          </p>
          {showSuccessAlert && (
            <Alert variant="success">
              The Email was sent successfully. Check your Email.
            </Alert>
          )}
          {showErrorAlert && (
            <Alert variant="danger">
              Email not recognized. Try again.
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-recovery"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-recovery"
              disabled={resetLinkSent}
            >
              {resetLinkSent ? "Reset Link Sent" : "Send Reset Link"}
            </button>
          </form>
        </div>
        {/* Columna derecha */}
        <div
          className="col muestra"
          style={{ backgroundImage: `url(${recipes})` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordRecovery;

