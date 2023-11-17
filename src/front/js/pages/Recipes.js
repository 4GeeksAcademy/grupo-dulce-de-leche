
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "../../styles/myproducts.css";
import redvelvet from "../../img/redvelvet.png";
import CreateRecipeButton from "../component/CreateRecipeButton";

const Recipes = () => {

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("jwt-token");


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 401) {navigate("/login")}
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const recipesData = await response.json();
        setRecipes(recipesData);
      } catch (error) {
        console.error(error);
        // Manejar el error, redireccionar, etc.
      }
    };

    if (token) {
      fetchRecipes();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleRecipeCreated = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching updated recipes");
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching updated recipes:", error);
    }
  };
  
  return (
    <Container fluid>
      <Row className="principal-recipes">
        <Col md={3} className="p-0 m-0">
          <AlmaCenaSidebar />
        </Col>
        <Col md={9}>
          <Row className="boton-categories">
            <Col md={6}>
              <p>
                Categories: <span>All</span>{" "}
              </p>
            </Col>
            <Col md={6}>
               <CreateRecipeButton onRecipeCreated={handleRecipeCreated} />
            </Col>
          </Row>
          <div className="myproducts bg-white">
            <Row xs={1} md={3} className="g-4">
              {recipes.map((recipe) => (
                <Col key={recipe.receta_id}>
                  <Card>
                    <Card.Img variant="top" src={redvelvet} />
                    <Card.Body>
                      <Card.Title>{recipe.nombre}</Card.Title>
                      <Row className="unidades-add">
                        <Col md={10}>
                          <p className="card-text">
                            {recipe.rinde} ud
                          </p>
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="primary"
                            onClick={() => navigate(`/dashboard/recipes/${recipe.receta_id}`)}
                          >
                            Details
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Recipes;

