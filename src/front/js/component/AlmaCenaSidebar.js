import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/sidebar.css";
import logo from "../../img/logoalmacena.png";
import userprofile from "../../img/userprofile.png";
import LogoutButton from './LogoutButton';

const AlmaCenaSidebar = () => {
  const { actions } = useContext(Context);
  const [selectedLink, setSelectedLink] = useState("");
  const [user, setUser] = useState({ name: "", last_name: "", photo_url: "" });
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Efecto secundario que se ejecuta solo una vez al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (token && !userDataLoaded) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/dashboard", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error("Error fetching user data");
          }

          const data = await response.json();
          setUser({
            name: data.name,
            last_name: data.last_name,
            photo_url: data.photo_url
          });

          setUserDataLoaded(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userDataLoaded]);

  useEffect(() => {
    // Actualiza el estado del enlace seleccionado cuando cambia la ruta
    setSelectedLink(pathname);
  }, [pathname]);



  const menuItems = [
    { path: "/dashboard", textdos: "Dashboard", icon: "fa-solid fa-table-columns fa-lg" },
    { path: "/dashboard/ingredients", textdos: "Ingredients", icon: "fa-solid fa-wheat-awn fa-lg", badge: "badge badge-secondary 1st", text: "1st" },
    { path: "/dashboard/recipes", textdos: "Recipes", icon: "fa-solid fa-book fa-lg", badge: "badge badge-secondary 2nd", text: "2nd" },
    { path: "/dashboard/products", textdos: "Products", icon: "fas fa-cheese fa-lg", badge: "badge badge-secondary 3rd", text: "3rd" },
  ];

  return (
    <>
      <div className="nuevoside" id="navegacion-vertical">
        <div className="menuverticallogo">
          <Link to="/dashboard">
            <img className="logosidebar" src={logo} alt="" />
          </Link>
        </div>

        <div className="menuvertical">
          <div className="table-responsive usuario-registrado">
            <table>
              <tr>
                <th rowspan="2" className="imagen-usuario">
                  <img src={user.photo_url} alt="" style={{ width: '60px', height: '60px', backgroundSize: 'cover', borderRadius: '50%' }} />
                </th>

                <td colspan="2" className="info-usuario-registrado"><Link className="enlace-user" to="/dashboard/profile"> {user.name} {user.last_name} </Link></td>
              </tr>
              <tr>
                <td ><span className="info-company">Company</span></td>
                <td className="icono-usuario"><Link className="enlace-user" to="/dashboard/edit-profile"><i className="fa-solid fa-user-pen fa-sm icono-usuario"></i></Link></td>
              </tr>
              <tr>

              </tr>
            </table>


          </div>
          <ul className="nav flex-column fa-ul fw-bold">
            {menuItems.map((item, index) => (
              <li key={index} className={`nav-item almacenasidebar ${selectedLink === item.path ? "selected" : ""}`}>
                <Link
                  className="menu-navega"
                  to={item.path}
                  style={selectedLink === item.path ? { color: "black", fontWeight: "bold", fontSize: "15px", fontFamily: 'Montserrat', } : {}}
                >
                  <div className="menu-text">
                    <i className={`fa ${item.icon} iconos-sidebar`}></i> {item.textdos} <span className={`badge ${item.badge}`}>{item.text}</span>
                  </div>
                </Link>
              </li>
            ))}
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




