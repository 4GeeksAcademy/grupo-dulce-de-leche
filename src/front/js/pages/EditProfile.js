import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";
import perfil from "../../img/perfil.png";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";



export const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");
  if (!token) {
  navigate("/login");
  }
  return (

    <div className="contain">
      <div className="row">
    <div className="col-2">
    <AlmaCenaSidebar/>
    </div>
    <div className="col-10">
      <div className="row principal">
        <div className="col gris">
          <h3 className="titulo-account">Account</h3>
          <form className="profile-user bg-white">
            <h4 className="personal">Personal information</h4>



            <div className="row foto">
              <div className="col-sm-12 col-md-2">
                <img className="perfil" src={perfil} />
              </div>
              <div className="col-sm-12 col-md-10">
                <i className="fa-solid fa-user-pen"></i>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>



            <div className="mb-3">
              <div className="row">
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    placeholder="Your Last Name"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"

                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"

                  />
                </div>
                <div className="col-12 mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
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
          </form>
        </div>
        </div>
        </div>
      </div>
    </div>

  );
};