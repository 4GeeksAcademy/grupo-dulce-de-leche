import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import perfil from "../../img/perfil.png";



export const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="container-fluid">
      <div className="row principal">
        <div className="col gris">
        <h3 className="titulo-account">Account</h3>
          <form className="profile-user bg-white">
            <h3 className="personal">Personal Account</h3>



            <div class="row foto">
    <div class="col-2">
    <img className="perfil" src={perfil} />
    </div>
    <div class="col-10">
    <i class="fa-solid fa-user-pen"></i> Change
    <i class="fa-solid fa-trash"></i> Remove
    </div>
  </div>

          
           
            <div className="mb-3">
              <div className="row">
                <div className="col-6 mb-3">
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
                <div className="col-6 mb-3">
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
                <div className="col-6 mb-3">
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
                <div className="col-6 mb-3">
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
                        className={`fa ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
          </form>
        </div>
        {/* Columna derecha */}
      
      </div>
    </div>
  );
};