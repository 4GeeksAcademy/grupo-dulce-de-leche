import React from "react";

export const Footer = () => (

<div class="container-fluid bgfooter" style={{ backgroundColor: "rgba(65, 94, 76, 1)" }}>
  <div class="row">
    <div class="col-4">
    <img
          src="https://i.ibb.co/16FC60X/logoalmacena.png"
          alt="logoalmacena"
          width="200"
          className="d-inline-block align-top ms-5"
        />
    </div>
    <div class="col-4">
    <div className="contactfooter d-flex flex-column">
          <p className="fs-3 text-white fw-bolder">Contact</p>
          <p className="p contacto">
            +1+86 852 346 000
            <br />
            info@foodzero.com
            <br />
            <br />
            1959 Sepulveda Blvd.
            <br />
            Culver City, CA, 90230
          </p>
        </div>
    </div>
    <div class="col-4">
    <p className="fs-3 text-white fw-bolder">Síguenos</p>
        <a href="https://www.instagram.com" className="text-white p-2">
        <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.twitter.com" className="text-white p-2">
        <i class="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://www.facebook.com" className="text-white p-2">
        <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://www.youtube.com" className="text-white p-2">
        <i class="fa-brands fa-youtube"></i>
        </a>
    </div>
  </div>
  <div className="line2"></div>
  <div> <p className="copyright">2023 AlmaCena All rights Reserved.</p></div>

</div>


);
