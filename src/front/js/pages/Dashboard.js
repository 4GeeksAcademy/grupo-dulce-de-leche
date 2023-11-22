import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, ListGroup, Container, Row, Col, Alert, CardTitle, CardFooter } from "react-bootstrap";
import "../../styles/dashboard.css";
import LoginButton from "../component/LoginButton";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";

const Dashboard = () => {
  const { actions, store } = useContext(Context);
  const [user, setUser] = useState({ name: "" });
  const [ingredientes, setIngredientes] = useState([]);
  const [productosFinales, setProductosFinales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          }
        });
        if (response.status == 401) {navigate("/login")}
        if (!response.ok) {
          throw new Error("Error fetching dashboard data");
        };
        const data = await response.json();
        setUser({ name: data.name });
        setIngredientes(data.ingredientes);
        setProductosFinales(data.productos_finales);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    if (!token) {
      navigate("/login");
      }
    fetchDashboardData();
  }, []);

  const token = localStorage.getItem("jwt-token");
  
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
              <h4 className="my-5 text-black text-start">Welcome, {user.name}</h4>


              <Row>
                <Col md={6}>
                  {ingredientes.length > 0 ? (
                    <Card className="rounded mb-5 dashboard-user">
                      <CardTitle className="p-4">You are low on these ingredients:</CardTitle>
                      <ListGroup variant="flush">
                        {ingredientes.map(ingrediente => (
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
                      <CardFooter className="dashboard-user-listado">And that's all</CardFooter>
                    </Card>
                  ) : (
                    <Alert variant="success">Ingredients looking good for now.</Alert>
                  )}
                </Col>
                <Col md={6}>
                  {productosFinales.length > 0 ? (
                    <Card className="rounded mb-5 dashboard-user">
                      <CardTitle className="p-4">You are low on these products:</CardTitle>
                      <ListGroup variant="flush">
                        {productosFinales.map(producto => (
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
                      <CardFooter className="dashboard-user-listado">And that's all</CardFooter>
                    </Card>
                  ) : (
                    <Alert variant="success">Products looking good for now.</Alert>
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


