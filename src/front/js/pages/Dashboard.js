import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Card, ListGroup, Container, Row, Col, Alert } from "react-bootstrap";

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

  return (
    <div className="gray-bg">
      <Container className="mt-5">
        <h4 className="mb-4">Dashboard</h4>
        <Row>
          <Col md={6}>
            <div className="fs-5 mb-3">Ingredientes para Comprar</div>
            {ingredientes.length > 0 ? (
              <Card className="rounded">
                <ListGroup variant="flush">
                  {ingredientes.map(ingrediente => (
                    <div key={ingrediente.materia_prima_id} className="divider-line">
                      <ListGroup.Item>
                        {ingrediente.nombre} - {ingrediente.cantidad_stock}{" "}
                        {ingrediente.unidad_medida}
                      </ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
              </Card>
            ) : (
              <Alert variant="info">No tienes ningún ingrediente que comprar.</Alert>
            )}
          </Col>
          <Col md={6}>
            <div className="fs-5 mb-3">Productos Finales para Producir</div>
            {productosFinales.length > 0 ? (
              <Card className="rounded">
                <ListGroup variant="flush">
                  {productosFinales.map(producto => (
                    <div key={producto.producto_final_id} className="divider-line">
                      <ListGroup.Item>
                        {producto.nombre} - {producto.cantidad_inventario}{" "}
                        {producto.unidad_medida}
                      </ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
              </Card>
            ) : (
              <Alert variant="info">No tienes que elaborar ningún producto por el momento.</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
