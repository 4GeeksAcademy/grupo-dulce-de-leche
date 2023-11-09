import React from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";
import logo from "../../img/logoalmacena.png";

export const AlmaCenaNavbar = () => {
	return (
	<Navbar style={{ backgroundColor: 'rgba(65, 94, 76, 1)' }} variant="dark" expand="lg">
		<Navbar.Brand href="/">

		<img className="d-inline-block align-top ms-5" width="200" src={logo} />
		  {/* <img
			src="https://i.ibb.co/16FC60X/logoalmacena.png"
			alt="logoalmacena"
			width="200"
			className="d-inline-block align-top ms-5"
		  /> */}
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
		  <Nav className="ms-auto gap-5 me-5">
			<SignUpButton />
			<LoginButton />
		  </Nav>
		</Navbar.Collapse>
	  </Navbar>
	);
  };
