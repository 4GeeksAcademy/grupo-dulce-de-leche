import React, { useState, useEffect, useContext } from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import recipes from "../../img/recipes.png";

export const Login = () => {

	return (
		<div className="container-fluid">
		<div className="row principal">
			{/* Columna izquierda */}
    <div className="col formulario">
	<h3 className="titulo-login">Login</h3>
	<p className="parrafo-login">Sign in with your data that you entered during your registration.</p>
	<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="name@example.com" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" placeholder="min. 8 characters" id="exampleInputPassword1"/>
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
