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

        <li className="nav-item almacenasidebar"><Link to="/dashboard/profile">
        <i class="fa-regular fa-user fa-lg iconos-sidebar"></i>
        <span class="menu-text">Profile</span></Link></li>

          <li className="nav-item almacenasidebar"><Link to="/dashboard">
          <i class="fa-solid fa-table-columns fa-lg iconos-sidebar"></i>
          <span class="menu-text">Dashboard</span></Link></li>


          <li className="nav-item almacenasidebar"><Link to="/dashboard/ingredients">
          <i class="fa-solid fa-wheat-awn fa-lg iconos-sidebar"></i>
          <span class="menu-text">Ingredients</span></Link></li>

          <li className="nav-item almacenasidebar"><Link to="/dashboard/recipes">
          <i class="fa-solid fa-book fa-lg iconos-sidebar"></i>
          <span class="menu-text">Recipes</span></Link></li>

          <li className="nav-item almacenasidebar"><Link to="/dashboard/products">
          <i class="fas fa-cheese fa-lg iconos-sidebar"></i>
           <span class="menu-text">Products</span></Link></li>
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
    <div className="collapse navbar-collapse collapse-movil" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item sidebarmovil">
        <Link to="/dashboard/profile">
        <i class="fa-regular fa-user fa-lg iconos-sidebar"></i>
        <span class="menu-text">Profile</span></Link>
        </li>
        <li className="nav-item sidebarmovil">
        <Link to="/dashboard">
          <i class="fa-solid fa-table-columns fa-lg iconos-sidebar"></i>
          <span class="menu-text">Dashboard</span></Link>
        </li>
        <li className="nav-item sidebarmovil">
        <Link to="/dashboard/ingredients">
          <i class="fa-solid fa-wheat-awn fa-lg iconos-sidebar"></i>
          <span class="menu-text">Ingredients</span></Link>
        </li>
        <li className="nav-item sidebarmovil">
        <Link to="/dashboard/recipes">
          <i class="fa-solid fa-book fa-lg iconos-sidebar"></i>
          <span class="menu-text">Recipes</span></Link>
        </li>
        <li className="nav-item sidebarmovil">
        <Link to="/dashboard/products">
          <i class="fas fa-cheese fa-lg iconos-sidebar"></i>
           <span class="menu-text">Products</span></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

 

    </>
  );
};

export default AlmaCenaSidebar;




