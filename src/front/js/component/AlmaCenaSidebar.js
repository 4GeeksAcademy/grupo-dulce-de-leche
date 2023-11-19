import React, { useContext } from "react";
import "../../styles/sidebar.css";
import logo from "../../img/logoalmacena.png";
import LogoutButton from './LogoutButton';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import receta from "../../img/receta.png";
import croisant from "../../img/croisant.png";
import tomate from "../../img/tomate.png";
import user from "../../img/user.png";
import lapiz from "../../img/lapiz.png";


const AlmaCenaSidebar = () => {
  const { store, actions } = useContext(Context);
  return (

    <>
    <div className="nuevoside">
      <div className="menuverticallogo">
        <Link to="/dashboard"> <img
          className="logosidebar"
          src={logo}
          alt="" />
        </Link>
      </div>
   

      <div className="menuvertical">
        <ul className="nav flex-column fa-ul">

        <li className="nav-item almacenasidebar">
        <span className="menu-text"> Hola Sara Pérez </span></li>

        <li className="nav-item almacenasidebar"><Link to="/dashboard/edit-profile">
          <img
          className="iconosidebar"
          src={lapiz}
          alt="" /><span class="menu-text">Profile</span></Link></li>

          <li className="nav-item almacenasidebar"><Link to="/dashboard">
          <img
          className="iconosidebar"
          src={user}
          alt="" /><span class="menu-text">Dashboard</span></Link></li>


          <li className="nav-item almacenasidebar"><Link to="/dashboard/ingredients">
          <img
          className="iconosidebar"
          src={tomate}
          alt="" /><span class="menu-text">Ingredients</span></Link></li>
          <li className="nav-item almacenasidebar"><Link to="/dashboard/recipes">
          <img
          className="iconosidebar"
          src={receta}
          alt="" /><span class="menu-text">Recipes</span></Link></li>
          <li className="nav-item almacenasidebar"><Link to="/dashboard/products">
          <img
          className="iconosidebar"
          src={croisant}
          alt="" /><span class="menu-text">Products</span></Link></li>
        </ul>


        </div>
        <div className="menuverticalboton">
        <LogoutButton actions={actions} />
        </div>


    </div>



    {/* Sidebar Movil */}


    <nav className="navbar navbar-expand-lg bg-body-tertiary menumovil">
  <div className="container-fluid">
  <a className="navbar-brand" href="#">Almacena</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/dashboard/profile">Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/ingredients">Ingredients</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/recipes">Recipes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/products">Products</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

 

    </>
  );
};

export default AlmaCenaSidebar;




