const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			userLoggedIn: null,
			profile:[],
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			signup: async (name, last_name, email, password, address) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: name,
							last_name: last_name,
							email: email,
							password: password,
							address: address,
						}),
					});

					if (!resp.ok) {
						const data = await resp.json();
						throw new Error(data.message);
					}

					const data = await resp.json();
					// Guardar el token en el localStorage
					localStorage.setItem("jwt-token", data.token);

					return data;
				} catch (error) {
					throw new Error(`Error during signup: ${error.message}`);
				}
			},


			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: email, password: password }),
					});

					if (!resp.ok) {
						console.log("Response status:", resp.status);
						console.log("Response status text:", resp.statusText);

						if (resp.status === 401) {
							throw new Error("Invalid credentials");
						} else if (resp.status === 400) {
							throw new Error("Invalid email or password format");
						} else {
							throw new Error("Error during login request");
						}
					}

					const data = await resp.json();

					localStorage.setItem("jwt-token", data.token);
					localStorage.setItem("user", JSON.stringify({ photo_url: data.photo_url }));
					setStore({ userLoggedIn: localStorage.getItem("jwt-token") });

					return data;
				} catch (error) {
					throw new Error(`Error during login: ${error.message}`);
				}
			},



			logout: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/logout", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
						},
					});

					if (!resp.ok) {
						throw new Error("Error during logout request");
					}

					localStorage.removeItem("jwt-token");

					setStore({ userLoggedIn: null });

					return true;
				} catch (error) {
					throw new Error(`Error during logout: ${error.message}`);
				}
			},
			
		}
	};
};

export default getState;