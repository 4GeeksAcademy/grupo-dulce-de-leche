import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import recipes from "../../img/recipes.png";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const enviarFormulario = async (event) => {
    event.preventDefault();
    
    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }
    
    try {
      // Llamada a la función que verifica el usuario en la base de datos
      await actions.login(email, password);
  
      // // Redirige al área privada inmediatamente después de la autenticación exitosa
      // actions.areaPrivadaUsuario(email, password);
  
      // Redirige a la ruta '/private'
      navigate("/dashboard");
  
    } catch (error) {
      // Manejo de errores, muestra un mensaje de error si el usuario no está registrado
      setError(`Incorrect User or Password.`);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


	return (
		<div className="container-fluid">
		<div className="row principal">
			{/* Columna izquierda */}
    <div className="col formulario">
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


    {/* <h3 className="titulo-login">Login</h3>
	<p className="parrafo-login">Sign in with your data that you entered during your registration.</p> */}
	<form onSubmit={enviarFormulario}>
  <h3 className="titulo-login">Login</h3>
	<p className="parrafo-login">Sign in with your data that you entered during your registration.</p>

  
  {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
  
<input
className="form-control"
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


  </div>
  <div className="mb-3 position-relative">
  <label htmlFor="password" className="form-label">
    Password
  </label>
  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      id="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <span className="input-group-text toggle-password" onClick={toggleShowPassword}>
      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
    </span>
  </div>
</div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Keep me logged in</label>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>

 

<div className="forgot-password">
<Link to="/PasswordRecovery"><p>Forgot password</p></Link>
    </div>
	<div className="no-account">
    
	<p>Don’t have an account? <Link to="/signup"><span>Sign up!</span></Link></p>
	</div>
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
