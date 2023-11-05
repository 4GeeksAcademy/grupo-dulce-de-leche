import React from "react";
import { Col, Row } from "react-bootstrap";

export const Footer = () => (
  <footer
    className="footer"
    style={{ backgroundColor: "rgba(65, 94, 76, 1)" }}
  >
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
		<Col className="ms-5">
		<p className="text-white fs-6">2023 AlmaCena All rights Reserved.</p></Col>
		<Col></Col>
	</Row>
  </footer>
);
