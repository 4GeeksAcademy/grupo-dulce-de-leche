import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, ListGroup, Container, Row, Col, Alert, CardTitle, CardFooter, Button, CardBody, CardImg } from "react-bootstrap";
import "../../styles/dashboard.css";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import CreateIngredientButton from "../component/CreateIngredientButton";
import CreateRecipeButton from "../component/CreateRecipeButton";
import CreateProductButton from "../component/CreateProductButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({ name: "" });
  const [ingredientes, setIngredientes] = useState([]);
  const [productosFinales, setProductosFinales] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({
    ingredientes: false,
    productos: false,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          }
        });
        if (response.status === 401) {
          navigate("/login");
        }
        if (!response.ok) {
          throw new Error("Error fetching dashboard data");
        }
        const data = await response.json();
        setUser({ name: data.name });
        setIngredientes(data.ingredientes);
        setProductosFinales(data.productos_finales);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          }
        });
        if (response.status === 401) {
          navigate("/login");
        }
        if (!response.ok) {
          throw new Error("Error fetching user recipes");
        }
        const data = await response.json();
        setUserRecipes(data);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/login");
    }

    fetchDashboardData();
    fetchUserRecipes();
  }, []);

  const toggleDropdown = (dropdownName) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <Container fluid>
      {token ? (
        <>
          <Row className="principal-products">
            <Col md={4} lg={2} className="p-0 m-0" id="reduccion">
              <AlmaCenaSidebar />
            </Col>
            <Col md={8} lg={10} id="reduccion-uno">
              <div className="gris" id="gris-dashboard">
                <h4 className="my-3 text-black text-start">Welcome, {user.name}</h4>

                <Row>
                  <Col md={6}>
                    {/* Botonera de Quickactions */}
                    <Card className="rounded mb-5 dashboard-user shadow bg-white">
                      <CardTitle className="p-4 fw-bold">Quick Start</CardTitle>
                      <CardBody className="dashboard-user-listado">
                        <div className="my-3 px-5"><CreateIngredientButton /></div>
                        <div className="my-3 px-5"><CreateRecipeButton /></div>
                        <div className="my-3 px-5"><CreateProductButton /></div>
                      </CardBody>
                    </Card>
                    {/* Últimas Recetas agregadas */}
                    <Card className="rounded mb-5 dashboard-user shadow">
                      <CardTitle className="p-4 fw-bold">Last Recipes</CardTitle>
                      <ListGroup variant="flush">
                        {userRecipes.length > 0 ? (
                          <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
                            {userRecipes.slice(-3).map((recipe) => (
                              <Col key={recipe.receta_id}>
                                <Link to={`/dashboard/recipes/${recipe.receta_id}`} className="text-decoration-none">
                                  <Card className="h-100">
                                    <Card.Img
                                      variant="top"
                                      className="img-thumbnail"
                                      src={recipe.photo_url}
                                      alt={recipe.nombre}
                                      style={{
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover',
                                      }}
                                    />
                                    <Card.Body>
                                      <Card.Title className="fs-6 fw-bold">{recipe.nombre}</Card.Title>
                                      <Card.Text className="fs-6 italic">{recipe.rinde} {recipe.unidad_medida}</Card.Text>
                                    </Card.Body>
                                  </Card>
                                </Link>
                              </Col>
                            ))}
                          </Row>
                        ) : (
                          <Alert variant="success" className="shadow">
                            Create a new recipe to see recipes here.
                          </Alert>
                        )}
                      </ListGroup>
                      {/* Icono de FontAwesome dentro del Card.Body */}
                      <Card.Body className="text-end">
                        <Link to="/dashboard/recipes" className="text-decoration-none">
                          <FontAwesomeIcon icon={faPlus} size="2x" className="mt-3 mx-3" />
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    {/* Dropdown de productos finales */}
                    {productosFinales.length > 0 ? (
                      <Card className="rounded mb-5 dashboard-user shadow">
                        <CardTitle className="p-4">
                          You are low on these products
                        </CardTitle>
                        {dropdownStates.productos && (
                          <ListGroup variant="flush">
                            {productosFinales.map((producto) => (
                              <div key={producto.producto_final_id} className="divider-line">
                                <ListGroup.Item className="dashboard-lista">
                                  <Row>
                                    <Col>{producto.nombre}</Col>
                                    <Col>{producto.cantidad_inventario} {producto.unidad_medida}</Col>
                                  </Row>
                                </ListGroup.Item>
                              </div>
                            ))}
                          </ListGroup>
                        )}
                        <CardFooter className="dashboard-user-listado">
                          <div className="d-flex justify-content-center">
                            <FontAwesomeIcon
                              icon={dropdownStates.productos ? faCircleChevronUp : faCircleChevronDown}
                              size="2x"
                              style={{ color: '#3e7046' }}
                              onClick={() => toggleDropdown('productos')}
                              className="cursor-pointer"
                            />
                          </div>
                        </CardFooter>
                      </Card>
                    ) : (
                      <Alert variant="success" className="shadow">
                        Products looking good for now.
                      </Alert>
                    )}
                    {/* Dropdown de ingredientes */}
                    {ingredientes.length > 0 ? (
                      <Card className="rounded mb-5 dashboard-user shadow">
                        <CardTitle className="p-4">You are low on these ingredients:</CardTitle>
                        {dropdownStates.ingredientes && (
                          <ListGroup variant="flush">
                            {ingredientes.map((ingrediente) => (
                              <div key={ingrediente.materia_prima_id} className="divider-line">
                                <ListGroup.Item className="dashboard-lista">
                                  <Row>
                                    <Col>{ingrediente.nombre}</Col>
                                    <Col>{ingrediente.cantidad_stock} {ingrediente.unidad_medida}</Col>
                                  </Row>
                                </ListGroup.Item>
                              </div>
                            ))}
                          </ListGroup>
                        )}
                        <CardFooter className="dashboard-user-listado">
                          <div className="d-flex justify-content-center">
                            <FontAwesomeIcon
                              icon={dropdownStates.ingredientes ? faCircleChevronUp : faCircleChevronDown}
                              size="2x"
                              style={{ color: '#3e7046' }}
                              onClick={() => toggleDropdown('ingredientes')}
                              className="cursor-pointer"
                            />
                          </div>
                        </CardFooter>
                      </Card>
                    ) : (
                      <Alert variant="success" className="shadow">Ingredients looking good for now.</Alert>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <Container className="gris">
        </Container>
      )}
    </Container>
  );
};

export default Dashboard;


