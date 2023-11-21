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
      <Row className="principal-products">
      <Col className="p-0 m-0 col-md-3 col-lg-2">
          <AlmaCenaSidebar />
        </Col>

        <Col className="col-md-9 col-lg-10">
          <div className="gris">
            <Row className="boton-categories">
              <Col sm={12} md={6}>
                <p>Categories: <span>All</span></p>
              </Col>
              <Col sm={12} md={6}>
                <CreateIngredientButton onIngredientCreated={() => fetchIngredientsData()} />
              </Col>
            </Row>



            <div className="myproducts bg-white">
              {/* <Card className="rounded"> */}
                <Card.Header className="titulo-ingredientes"> 
                  <Card.Title className="mb-0">Ingredients</Card.Title>
              </Card.Header>
                {/* <Card.Body>  */}
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity in Storage</th>
                        <th>Min Quantity</th>
                        <th>Unit</th>
                        <th>Classification</th>
                        <th className="columna-r-blanco"></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {materiasPrimas &&
                        materiasPrimas.map((materiaPrima) => (
                          <tr key={materiaPrima.materia_prima_id}>
                            <td>{materiaPrima.nombre}</td>
                            <td>{materiaPrima.cantidad_stock}</td>
                            <td>{materiaPrima.cantidad_stock_minimo}</td>
                            <td>{materiaPrima.unidad_medida}</td>
                            <td>{materiaPrima.clasificacion}</td>
                            <td className="columna-r-gris"><EditIngredientButton
                              ingredient={materiaPrima}
                              onIngredientUpdated={() => fetchIngredientsData()}
                            /></td>
                            <td><DeleteIngredientButton ingredient={materiaPrima} onIngredientDeleted={() => fetchIngredientsData()} />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                   </Table>
          {/* </Card.Body>
              </Card>  */}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Ingredients;