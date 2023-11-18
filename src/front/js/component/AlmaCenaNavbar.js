import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";
import logo from "../../img/logoalmacena.png";
import { Context } from "../store/appContext";
import LogoutButton from "./LogoutButton";


export const MenuNavegacion = () => {

	const { store, actions } = useContext(Context);
	const [userLoggedIn, setUserLoggedIn] = useState(store.userLoggedIn);

	useEffect(() => {
		setUserLoggedIn(store.userLoggedIn);
	}, [store.userLoggedIn]);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<img className="Almacena" src={logo} alt="Logo" />
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							{userLoggedIn != null ? (
								<LogoutButton actions={actions} />
							) : null}
						</li>
						<li className="nav-item">
							<SignUpButton />
						</li>
						<li className="nav-item">
							<LoginButton />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
