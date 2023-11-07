import React, { useState, useEffect, useContext } from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import recipes from "../../img/recipes.png";

export const Signup = () => {

	return (
		<div className="container-fluid">
		<div className="row principal">
			{/* Columna izquierda */}
    <div className="col formulario-signup">
	<h3 className="titulo-login">Sign up</h3>
	<p className="parrafo-login">Register to create your restaurant or personal account.</p>
	<form>
  <div class="mb-3">
  <div class="row">
    <div class="col-6 mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="Name" class="form-control" id="name" placeholder="Your Name" aria-describedby="emailHelp"/>
  </div>
    <div class="col-6 mb-3">
    <label for="exampleInputEmail1" class="form-label">Last Name</label>
    <input type="Last Name" class="form-control" id="Last Name" placeholder="Your Last Name" aria-describedby="emailHelp"/>
    </div>
    
    <div class="col-6 mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="name@example.com" aria-describedby="emailHelp"/>
  </div>
    <div class="col-6 mb-3">
    <label for="exampleInputEmail1" class="form-label">Phone Numer</label>
    <input type="phone number" class="form-control" id="exampleInputEmail1" placeholder="+34 611 111 116" aria-describedby="emailHelp"/>
   </div>

   <div class="col-12 mb-3">
   <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" placeholder="min. 8 characters" id="exampleInputPassword1"/>
 
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
