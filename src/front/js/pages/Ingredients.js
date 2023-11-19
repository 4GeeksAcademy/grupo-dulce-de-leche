import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Container, Table, Row, Col } from "react-bootstrap";
import LoginButton from "../component/LoginButton";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import CreateIngredientButton from "../component/CreateIngredientButton";
import EditIngredientButton from "../component/EditIngredientButton";
import DeleteIngredientButton from "../component/DeleteIngredientButton";

const Ingredients = () => {
  const { actions, store } = useContext(Context);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const navigate = useNavigate();

  const fetchIngredientsData = async () => {
    try {
      const token = localStorage.getItem("jwt-token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(process.env.BACKEND_URL + "/dashboard/ingredients", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 401) { navigate("/login") }
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

  useEffect(() => {
    fetchIngredientsData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="p-0 m-0">
          <AlmaCenaSidebar />
        </Col>

        <Col md={9}>
          <CreateIngredientButton onIngredientCreated={() => fetchIngredientsData()} />
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
                  {materiasPrimas &&
                    materiasPrimas.map((materiaPrima) => (
                      <tr key={materiaPrima.materia_prima_id}>
                        <td>{materiaPrima.nombre}</td>
                        <td>{materiaPrima.clasificacion}</td>
                        <td>{materiaPrima.cantidad_stock}</td>
                        <td>{materiaPrima.cantidad_stock_minimo}</td>
                        <td>
                          <EditIngredientButton
                            ingredient={materiaPrima}
                            onIngredientUpdated={() => fetchIngredientsData()}
                          />
                          <DeleteIngredientButton ingredient={materiaPrima} onIngredientDeleted={() => fetchIngredientsData()} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Ingredients;