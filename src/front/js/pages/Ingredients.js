import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Container, Table, Row, Col } from "react-bootstrap";
import LoginButton from "../component/LoginButton";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import CreateIngredientButton from "../component/CreateIngredientButton";


const Ingredients = () => {
  const { actions, store } = useContext(Context);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredientsData = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard/ingredients", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          }
        });

        if (!response.ok) {
          throw new Error("Error fetching ingredients data");
        }

        const data = await response.json();

        if (data && Array.isArray(data) && data.length > 0) {
          setMateriasPrimas(data);
        }
      } catch (error) {
        
        console.error("Error fetching ingredients data:", error);
      }
    };
    
    if (!token) {
      navigate("/login");
    }
    fetchIngredientsData();
  }, []);

  const token = localStorage.getItem("jwt-token");
  return (
    <Container fluid>
      {token && token !== null && token !== undefined ? (
        <Row>


          <Col md={3} className="p-0 m-0">
            <AlmaCenaSidebar />
          </Col>

          <Col md={9}>
            <CreateIngredientButton/>
            <Card className="rounded m-5">
              <Card.Header>
                <Card.Title className="mb-0">Materias Primas</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Clasificación</th>
                      <th>Cantidad en Stock</th>
                      <th>Cantidad Stock Mínimo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materiasPrimas && materiasPrimas.map(materiaPrima => (
                      <tr key={materiaPrima.materia_prima_id}>
                        <td>{materiaPrima.nombre}</td>
                        <td>{materiaPrima.clasificacion}</td>
                        <td>{materiaPrima.cantidad_stock}</td>
                        <td>{materiaPrima.cantidad_stock_minimo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Container className="gris">
          <div></div>
        </Container>
      )}
    </Container>
  );
};

export default Ingredients;





