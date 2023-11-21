import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import { Container, Row, Col, Table, Button, Spinner, Modal } from "react-bootstrap";
import "../../styles/singlerecipe.css";
import singlerecipe from "../../img/singlerecipe.png";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + `/dashboard/recipes/${recipe_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          },
        });
        if (response.status == 401) { navigate("/login") }
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const recipeData = await response.json();
        setRecipe(recipeData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [token, recipe_id]);

  const handleMakeRecipe = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes/make", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipe_id: recipe_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to make recipe");
      }

      console.log("Recipe made successfully");
      setShowModal(true);
    } catch (error) {
      console.error(error);
      // Manejar el error
    }
  };

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <Container fluid>
      <Row>
      <Col md={4} lg={2} className="p-0 m-0" id="reduccion">
          <AlmaCenaSidebar />
        </Col>
        <Col md={8} lg={10} className="gris" id="reduccion-uno">
          <Row className="boton-categories">
            <Col sm={12} md={6}>
              <h3 className="titulo-single-recipe">{loading || !recipe ? "Loading..." : recipe.nombre}</h3>
            </Col>
            <Col sm={12} md={6}>
            <Button variant="primary" onClick={handleMakeRecipe} disabled={loading || !recipe}>
                {loading ? <Spinner animation="border" size="sm" /> : "Make Recipe"}
              </Button>
            </Col>
          </Row>
          {loading && <Spinner animation="border" />}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && recipe && (
            <div className="profile-user bg-white">
              <h4 className="personal">Recipe information</h4>
              <Row className="foto">
                <Col sm={12} md={4} className="imgsinglerecipe" style={{ backgroundImage: `url(${singlerecipe})` }}></Col>
                <Col sm={12} md={8}>
                  <div className="table-totalyield">
                    <Table className="table single recipe">
                      <thead>
                        <tr>
                          <th className="threcipe">Total Yield</th>
                          <th className="threcipe">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="trsinglerecipe">
                          <td className="tdsinglerecipe">{recipe.rinde}</td>
                          <td className="tdsinglerecipe">{recipe.unidad_medida_rinde}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="table-ingredients">
                    <Table className="table single recipe">
                      <thead>
                        <tr>
                          <th className="threcipe">Qty</th>
                          <th className="threcipe">Unit</th>
                          <th className="threcipe">Ingredient</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipe.ingredientes.map((ingrediente, index) => (
                          <tr key={index} className="trsinglerecipe">
                            <td className="tdsinglerecipe">{ingrediente.cantidad_necesaria}</td>
                            <td className="tdsinglerecipe">{ingrediente.unidad_medida}</td>
                            <td className="tdsinglerecipe">{ingrediente.nombre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
              {/* Modal */}
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Recipe Made</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Your inventory and products have been updated.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SingleRecipe;
