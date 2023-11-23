import React, { useContext, useEffect, useState } from "react";
import "../../styles/sidebar.css";
import logo from "../../img/logoalmacena.png";
import userprofile from "../../img/userprofile.png";
import LogoutButton from './LogoutButton';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



const AlmaCenaSidebar = () => {
  const [user, setUser] = useState({ name: "", last_name: "" });
  const { store, actions } = useContext(Context);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          }
        });
        if (response.status == 401) { navigate("/login") }
        if (!response.ok) {
          throw new Error("Error fetching dashboard data");
        };
        const data = await response.json();
        setUser({
          name: data.name,
          last_name: data.last_name,
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    if (!token) {
      navigate("/login");
    }
    fetchDashboardData();
  }, []);

  const token = localStorage.getItem("jwt-token");



  return (

    <>
      <div className="nuevoside" id="navegacion-vertical">
        <div className="menuverticallogo">
          <Link to="/dashboard"> <img
            className="logosidebar"
            src={logo}
            alt="" />
          </Link>
        </div>


        <div className="menuvertical" >
        <div className="table-responsive usuario-registrado">
          <table>
            <tr>
              <th rowspan="2" className="imagen-usuario"><img src={userprofile} alt="" /></th>
              <td colspan="2" className="info-usuario-registrado"><Link className="enlace-user" to="/dashboard/profile"> {user.name} {user.last_name} </Link></td>
            </tr>
            <tr>
              <td ><span className="info-company">Company</span></td>
              <td className="icono-usuario"><Link className="enlace-user" to="/dashboard/edit-profile"><i class="fa-solid fa-user-pen fa-sm icono-usuario"></i></Link></td>
            </tr>
            <tr>

            </tr>
          </table>
          </div>
          <ul className="nav flex-column fa-ul">

            {/* <li className="nav-item almacenasidebar">
        <span className="menu-text"> {user.name} {user.last_name}</span></li> */}


            <li className="nav-item almacenasidebar"><Link className="menu-navega" to="/dashboard">
              <p className="menu-text">  <i className="fa-solid fa-table-columns fa-lg iconos-sidebar"></i>
             Dashboard </p>  </Link> </li>


            <li className="nav-item almacenasidebar"><Link className="menu-navega" to="/dashboard/ingredients">
            <p className="menu-text"> <i className="fa-solid fa-wheat-awn fa-lg iconos-sidebar"></i>
              Ingredients <span class="badge badge-secondary">1st</span></p></Link></li>

            <li className="nav-item almacenasidebar"><Link className="menu-navega" to="/dashboard/recipes">
            <p className="menu-text"> <i className="fa-solid fa-book fa-lg iconos-sidebar"></i>
             Recipes <span class="badge badge-secondary">2nd</span></p></Link></li>

            <li className="nav-item almacenasidebar"><Link className="menu-navega" to="/dashboard/products">
            <p className="menu-text"><i className="fas fa-cheese fa-lg iconos-sidebar"></i>
              Products <span class="badge badge-secondary">3rd</span></p></Link></li>
          </ul>
        </div>


        <div className="menuverticalboton">
          <LogoutButton actions={actions} />
        </div>


      </div>



      {/* Sidebar Movil */}


      <nav className="navbar navbar-expand-lg bg-body-tertiary menumovil" id="navegacion-horizontal">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Almacena</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse collapse-movil" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item sidebarmovil">
                <Link className="menu-navega" to="/dashboard/profile">
                  <i className="fa-regular fa-user fa-lg iconos-sidebar"></i>
                  <span className="menu-text-movil">Profile</span></Link>
              </li>
              <li className="nav-item sidebarmovil">
                <Link className="menu-navega" to="/dashboard">
                  <i className="fa-solid fa-table-columns fa-lg iconos-sidebar"></i>
                  <span className="menu-text-movil">Dashboard</span></Link>
              </li>
              <li className="nav-item sidebarmovil">
                <Link className="menu-navega" to="/dashboard/ingredients">
                  <i className="fa-solid fa-wheat-awn fa-lg iconos-sidebar"></i>
                  <span className="menu-text-movil">Ingredients</span></Link>
              </li>
              <li className="nav-item sidebarmovil">
                <Link className="menu-navega" to="/dashboard/recipes">
                  <i className="fa-solid fa-book fa-lg iconos-sidebar"></i>
                  <span className="menu-text-movil">Recipes</span></Link>
              </li>
              <li className="nav-item sidebarmovil">
                <Link className="menu-navega" to="/dashboard/products">
                  <i className="fas fa-cheese fa-lg iconos-sidebar"></i>
                  <span className="menu-text-movil">Products</span></Link>
              </li>
            </ul>
            <div className="menuverticalboton">
              <LogoutButton actions={actions} />
            </div>
          </div>


        </div>
      </nav>



    </>
  );
};

export default AlmaCenaSidebar;