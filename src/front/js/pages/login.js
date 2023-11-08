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
      navigate("/");
  
    } catch (error) {
      // Manejo de errores, muestra un mensaje de error si el usuario no está registrado
      setError("Usuario no registrado");
      console.error("Error al iniciar sesión", error);
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
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={toggleShowPassword}>
            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Keep me logged in</label>
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>

 

<div className="forgot-password">
<Link to="/forgot"><p>Forgot password</p></Link>
    </div>
	<div className="no-account">
    
	<p>Don’t have an account? <Link to="#"><span>Sign up!</span></Link></p>
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
