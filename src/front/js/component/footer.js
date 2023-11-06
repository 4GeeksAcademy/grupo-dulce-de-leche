import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => (
  <footer className="footer" style={{ backgroundColor: "rgba(65, 94, 76, 1)" }}>
    <Row className="p-5">
      <Col>
        <img
          src="https://i.ibb.co/16FC60X/logoalmacena.png"
          alt="logoalmacena"
          width="200"
          className="d-inline-block align-top ms-5"
        />
      </Col>
      <Col>
        <div className="contactfooter d-flex flex-column">
          <p className="fs-3 text-white fw-bolder">Contact</p>
          <p className="fs-6 text-white">
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
      </Col>
      <Col></Col>
    </Row>
    <div className="line2"></div>
	<Row>
      <Col lg="4">
        <p className="text-white fs-6">2023 AlmaCena All rights Reserved.</p>
      </Col>
      <Col lg="8">
        <a href="https://www.instagram.com" className="text-white p-2">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.twitter.com" className="text-white p-2">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.facebook.com" className="text-white p-2">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.youtube.com" className="text-white p-2">
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
      </Col>
    </Row>
  </footer>
);
