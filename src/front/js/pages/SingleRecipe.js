import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "../../styles/singlerecipe.css";
import singlerecipe from "../../img/singlerecipe.png";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL+ `/dashboard/recipes/${recipe_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        
        const recipeData = await response.json();
        console.log("Recipe Data:", recipeData);
        setRecipe(recipeData);
      } catch (error) {
        console.error(error);
        // Manejar el error, redireccionar, etc.!!!!!!
      }
    };
  
    fetchRecipe();
  }, [token, recipe_id]);
  
  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={3} md={2} className="p-0 m-0">
          <AlmaCenaSidebar />
        </Col>
        <Col xs={9} md={10} className="gris">
          <Row className="boton-categories">
            <Col sm={12} md={6}>
              <h3 className="titulo-single-recipe">{recipe ? recipe.nombre : "Loading..."}</h3>
            </Col>
            <Col sm={12} md={6}>
              <Button variant="primary">Edit Recipe</Button>
            </Col>
          </Row>
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
                        <td className="tdsinglerecipe">{recipe ? recipe.rinde : "Loading..."}</td>
                        <td className="tdsinglerecipe">{recipe ? recipe.unidad_medida_rinde : "Loading..."}</td>
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
                      {recipe && recipe.ingredientes.map((ingrediente, index) => (
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleRecipe;
