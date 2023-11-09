import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import recipes from "../../img/recipes.png";



export const Signup = () => {


  const { store, actions } = useContext(Context);
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
  const enviarFormulario = async (event) => {
    event.preventDefault();

    if (user.name.trim() === "" || user.last_name.trim() === "" || user.email.trim() === "" || user.address.trim() === "" || user.password.trim() === "") {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      await actions.signup(user);
      // Registro exitoso, podrías redirigir si es necesario
      // navigate("/");
    } catch (error) {
      setError(`El usuario ${user.email} ya existe. Por favor inicia sesión.`);
    }
  };


  return (
    <div className="container-fluid">
      <div className="row principal">
        {/* Columna izquierda */}
        <div className="col formulario-signup">


          <form onSubmit={enviarFormulario}>
            <h3 className="titulo-login">Sign up</h3>
            <p className="parrafo-login">Register to create your restaurant or personal account.</p>
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            <div class="mb-3">
              <div class="row">
                <div class="col-6 mb-3">
                  <label for="exampleInputEmail1" class="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                  
                    placeholder="Your Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>

                <div class="col-6 mb-3">
                  <label for="exampleInputEmail1" class="form-label">Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    
                    placeholder="Your last Name"
                    value={user.last_name}
                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                  />
                </div>


                <div class="col-6 mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="name@example.com"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>

                <div class="col-6 mb-3">
                  <label for="exampleInputEmail1" class="form-label">Address</label>
                  <input
                    className="form-control"
                    type="text"
                          placeholder="address"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                  />
                </div>


                <div className="col-12 mb-3 position-relative">
                  <label htmlFor="registro" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <span className="input-group-text toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                  </div>
                </div>



              </div>






            </div>
            <button type="submit" class="btn btn-primary">Create account</button>
          </form>


        </div>


        {/* Columna derecha */}
        <div className="col muestra" style={{ backgroundImage: `url(${recipes})` }}>
          {/* <img className="cucharas" src={recipes} />
    <h4>Keep track of all your inventory.</h4>
    <p className="p-login">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p> */}
        </div>


      </div>
    </div>
  );
};
