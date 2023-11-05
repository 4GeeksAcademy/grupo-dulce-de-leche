import React from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';

export const AlmaCenaNavbar = () => {
	return (
	<Navbar style={{ backgroundColor: 'rgba(65, 94, 76, 1)' }} variant="dark" expand="lg">
		<Navbar.Brand href="/">
		  <img
			src="https://i.ibb.co/16FC60X/logoalmacena.png"
			alt="logoalmacena"
			width="200"
			className="d-inline-block align-top ms-5"
		  />
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
		  <Nav className="ml-auto gap-2">
			<Button variant="light" className="mr-2">Signup</Button>
			<Button variant="light">Login</Button>
		  </Nav>
		</Navbar.Collapse>
	  </Navbar>
	);
  };
