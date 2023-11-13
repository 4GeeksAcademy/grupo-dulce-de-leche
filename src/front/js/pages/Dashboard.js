import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Card, ListGroup, Container, Row, Col, Alert, CardTitle, CardFooter } from "react-bootstrap";
import "../../styles/dashboard.css";
import LoginButton from "../component/LoginButton";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";

const Dashboard = () => {
  const { actions, store } = useContext(Context);
  const [ingredientes, setIngredientes] = useState([]);
  const [productosFinales, setProductosFinales] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          }
        });
        if (!response.ok) {
          throw new Error("Error fetching dashboard data");
        }
        const data = await response.json();
        setIngredientes(data.ingredientes);
        setProductosFinales(data.productos_finales);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const token = localStorage.getItem("jwt-token");

  return (
    <> <AlmaCenaSidebar />
    <Container className="mt-5">
      {token ? (
        <>
          <h4 className="mb-4 text-black text-start">Welcome</h4>
          <Row>
            <Col md={6}>
              {ingredientes.length > 0 ? (
                <Card className="rounded mb-5">
                  <CardTitle className="p-4">You are low on these ingredients:</CardTitle>
                  <ListGroup variant="flush">
                    {ingredientes.map(ingrediente => (
                      <div key={ingrediente.materia_prima_id} className="divider-line">
                        <ListGroup.Item>
                          <Row>
                            <Col>{ingrediente.nombre}</Col>
                            <Col>{ingrediente.cantidad_stock} {ingrediente.unidad_medida}</Col>
                          </Row>
                        </ListGroup.Item>
                      </div>
                    ))}
                  </ListGroup>
                  <CardFooter>And that's all</CardFooter>
                </Card>
              ) : (
                <Alert variant="success">Ingredients looking good for now.</Alert>
              )}
            </Col>
            <Col md={6}>
              {productosFinales.length > 0 ? (
                <Card className="rounded mb-5">
                  <CardTitle className="p-4">You are low on these products:</CardTitle>
                  <ListGroup variant="flush">
                    {productosFinales.map(producto => (
                      <div key={producto.producto_final_id} className="divider-line">
                        <ListGroup.Item>
                          <Row>
                            <Col>{producto.nombre}</Col>
                            <Col>{producto.cantidad_inventario} {producto.unidad_medida}</Col>
                          </Row>
                        </ListGroup.Item>
                      </div>
                    ))}
                  </ListGroup>
                  <CardFooter>And that's all</CardFooter>
                </Card>
              ) : (
                <Alert variant="success">Products looking good for now.</Alert>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Container className="gris">
          <div className="fs-4 fw-bold text-center p-4">Tienes que iniciar sesión para acceder</div>
          <div className="d-flex justify-content-center">
            <LoginButton />
          </div>
        </Container>
      )}
    </Container>
    </>
  );
};

export default Dashboard;

