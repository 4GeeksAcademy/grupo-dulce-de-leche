import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";
import perfil from "../../img/perfil.png";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    address: ""
  });

  const token = localStorage.getItem("jwt-token");
  if (!token) {
    navigate("/login");
  }


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          }
        });
        if (response.status == 401) { navigate("/login") }
        if (!response.ok) {
          throw new Error("Error fetching dashboard data");
        }
        const data = await response.json();
        setUser({
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          address: data.address,
          password: data.password,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <div className="container-fluid">
      <div className="row principal-recipes">
        <div className="p-0 m-0 col-sm-12 col-md-2">
          <AlmaCenaSidebar />
        </div>
        <div className="col-sm-12 col-md-10">
          <div className="row principal">
            <div className="col gris">
            <div className="row info">
                  <div className="col-11">
                    <h4 className="personal">Personal information</h4>
                  </div>
                  <div className="col-1"><Link to="/dashboard/edit-profile">
                    <i className="fa-solid fa-user-pen icono-personal fa-xl"></i> </Link>
                  </div>
                </div>

              <form className="profile-user bg-white">
                


               <div className="row foto">
              <div className="col-sm-12 col-md-2">
                <img className="perfil" src={perfil} />
              </div>
            </div> 



                <div className="mb-3">
                  <div className="row">
                    <div className="col-sm-12 col-md-6 mb-3">
                      <label className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        value={user.name}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                      <label className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Your Last Name"
                        value={user.last_name}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                      <label className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        value={user.email}
                        readOnly
                        disabled

                      />
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                      <label className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Address"
                        value={user.address}
                        readOnly
                        disabled

                      />
                    </div>
                    {/* <div className="col-12 mb-3 position-relative">
                      <label className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          value={user.password}
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
                    </div> */}
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