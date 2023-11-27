import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import recipes from "../../img/recipes.png";
import "../../styles/login.css";
import { Context } from "../store/appContext";

const Signup = () => {
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
  const [newUserPhoto, setNewUserPhoto] = useState("");

  // CLOUDINARY //

  const upload_preset_name = "almacena-upload";
  const cloud_name = "dq5gjc26f";

  async function cloudinary(formData) {
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("cloudinary response", data);
      setNewUserPhoto(data.secure_url);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  useEffect(() => {

  }, [newUserPhoto]);

  function handleFile(event) {
    const file = event.target.files[0];
    console.log("fileInfo:", file);

    if (file.size >= 10485760) {
      alert("Elige una imagen más pequeña (menos que 10MB).");
    } else {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", upload_preset_name);
      cloudinary(formData);
    }
  }

  const enviarFormulario = async (event) => {
    event.preventDefault();
    setError("");
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
      await actions.signup(
        user.name,
        user.last_name,
        user.email,
        user.password,
        user.address,
        newUserPhoto
      );

      setRegistrationSuccess(true);

      setTimeout(() => {
        navigate("/login");
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
        <div className="col formulario-signup">
          <div className="row pb-5">
            <div className="col-1"></div>
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
              <label htmlFor="formFile" className="form-label extradark-blue fw-bold">Imagen de perfil</label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                name="photo"
                onChange={(e) => handleFile(e)}
              />
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-sm-12 col-md-6 mb-3">
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
                <div className="col-sm-12 col-md-6 mb-3">
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
                <div className="col-sm-12 col-md-6 mb-3">
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
                <div className="col-sm-12 col-md-6 mb-3">
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
                        className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"
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
        <div
          className="col muestra"
          style={{ backgroundImage: `url(${recipes})` }}
        ></div>
      </div>
    </div>
  );
};

export default Signup;
