import React, { useContext, useState } from "react";
import { navigate } from "react-router-dom"; // Asegúrate de importar la función navigate
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import recipes from "../../img/recipes.png";
import "../../styles/login.css";

export const Signup = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const enviarFormulario = async (event) => {
    event.preventDefault();
    setError(""); // Limpiar errores al intentar registrar nuevamente
    setRegistrationSuccess(false);

    if (
      user.name.trim() === "" ||
      user.last_name.trim() === "" ||
      user.email.trim() === "" ||
      user.address.trim() === "" ||
      user.password.trim() === ""
    ) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      // Realizar la solicitud de registro utilizando el método signup del contexto
      await actions.signup(
        user.name,
        user.last_name,
        user.email,
        user.password,
        user.address
      );

      // Registro exitoso
      setRegistrationSuccess(true);

     // Redirección despues de 3 segundos
      setTimeout(() => {
        navigate("/login"); // Redirige a la página
      }, 3000);
    } catch (error) {
      setError(
        `El usuario ${user.email} ya existe. Por favor inicia sesión.`
      );
      console.error(error);
    }
  };


  return (
    <div className="container-fluid">
      <div className="row principal">
        {/* Columna izquierda */}
        <div className="col formulario-signup">
        <div className="row pb-5">
    <div className="col-1">
    </div>
    <div className="col-1">
    <i className="fa-solid fa-chevron-left"></i>
    </div>
    <div className="col-10">
    <div className="back-login"> <Link to="/">Back to Home</Link> </div> 
    </div>
    </div>

          <form onSubmit={enviarFormulario}>
            <h3 className="titulo-login">Sign up</h3>
            <p className="parrafo-login">
              Register to create your restaurant or personal account.
            </p>
            {error && <div className="alert alert-danger">{error}</div>}
            {registrationSuccess && (
              <div className="alert alert-success">
                Registration successful! You can now log in... Redirecting to Login
              </div>
            )}
            <div className="mb-3">
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    placeholder="Your Last Name"
                    value={user.last_name}
                    onChange={(e) =>
                      setUser({ ...user, last_name: e.target.value })
                    }
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 mb-3 position-relative">
                  <label className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <span
                      className="input-group-text toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`fa ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create account
            </button>
          </form>
        </div>
        {/* Columna derecha */}
        <div
          className="col muestra"
          style={{ backgroundImage: `url(${recipes})` }}
        >
          {/* Contenido de la columna derecha */}
        </div>
      </div>
    </div>
  );
};
