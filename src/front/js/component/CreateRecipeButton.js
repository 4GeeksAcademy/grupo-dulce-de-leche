import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Dropdown, Row, Col } from "react-bootstrap";

const CreateRecipeButton = ({ onRecipeCreated }) => {
  const [show, setShow] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [rinde, setRinde] = useState(1);
  const [unidadMedida, setUnidadMedida] = useState("units");

  const handleClose = () => {
    setShow(false);
    setSelectedIngredients([]);
    setIngredientQuantities({});
    setSelectedIngredient(null);
    setQuantity("");
    setRecipeName("");
    setRinde(1);
    setUnidadMedida("units");
  };

  const fetchAvailableIngredients = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/ingredients", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching ingredients");
      }

      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleShow = () => {
    fetchAvailableIngredients();
    setShow(true);
  };

  const handleIngredientSelected = (ingredient) => {
    setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    setSelectedIngredient(null);
  };

  const handleQuantityChange = (ingredientId, quantity) => {
    setIngredientQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ingredientId]: quantity,
    }));
  };

  const handleCreateRecipe = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify({
          nombre: recipeName,
          rinde: parseInt(rinde, 10),
          unidad_medida: unidadMedida,
          ingredientes: selectedIngredients.map((ingredient) => ({
            materia_prima_id: ingredient.materia_prima_id,
            cantidad_necesaria: parseInt(ingredientQuantities[ingredient.materia_prima_id], 10),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating recipe");
      }

      const data = await response.json();

      handleClose();

      if (onRecipeCreated) {
        onRecipeCreated(data.ingredientes);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Recipe
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRecipeName">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipe name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRinde">
              <Form.Label>Rinde</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rinde"
                value={rinde}
                onChange={(e) => setRinde(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUnidadMedida">
              <Form.Label>Unidad de Medida</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter unidad de medida"
                value={unidadMedida}
                onChange={(e) => setUnidadMedida(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-ingredient">
                      {selectedIngredient ? selectedIngredient.nombre : "Select Ingredient"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {ingredients.map((ingredient) => (
                        <Dropdown.Item
                          key={ingredient.materia_prima_id}
                          onClick={() => setSelectedIngredient(ingredient)}
                        >
                          {ingredient.nombre}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button
                    variant="primary crear-receta"
                    onClick={() => {
                      if (selectedIngredient && quantity) {
                        handleIngredientSelected(selectedIngredient);
                        handleQuantityChange(selectedIngredient.materia_prima_id, quantity);
                        setSelectedIngredient(null);
                        setQuantity("");
                      }
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            {selectedIngredients.length > 0 && (
              <Form.Group controlId="formSelectedIngredients">
                <Form.Label>Selected Ingredients</Form.Label>
                <ul>
                  {selectedIngredients.map((ingredient) => (
                    <li key={ingredient.materia_prima_id}>
                      {ingredient.nombre} - {ingredientQuantities[ingredient.materia_prima_id]}{' '}
                      {ingredient.unidad_medida}
                    </li>
                  ))}
                </ul>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateRecipe}>
            Create Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateRecipeButton;







