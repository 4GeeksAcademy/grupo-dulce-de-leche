// CreateRecipeButton.js

import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";

const CreateRecipeButton = ({ onRecipeCreated }) => {
  const [show, setShow] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState("");
  
  const handleClose = () => {
    setShow(false);
    setSelectedIngredient(null);
    setQuantity("");
  };

  const handleShow = () => {
    // Obtener las materias primas del usuario al abrir el modal
    fetchAvailableIngredients();
    setShow(true);
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

  const handleCreateRecipe = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify({
          nombre: "Recipe Name",
          rinde: 1, 
          unidad_medida: "units", 
          ingredientes: [
            {
              materia_prima_id: selectedIngredient.materia_prima_id,
              cantidad_necesaria: parseInt(quantity, 10),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating recipe");
      }

 
      handleClose();

      if (onRecipeCreated) {
        onRecipeCreated();
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
            {/* Campos del formulario para la receta */}
            <Form.Group controlId="formRecipeName">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control type="text" placeholder="Enter recipe name" />
            </Form.Group>
            {/* Otros campos del formulario ... */}

            {/* Dropdown para seleccionar ingredientes */}
            <Form.Group controlId="formIngredient">
              <Form.Label>Ingredient</Form.Label>
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
            </Form.Group>

            {/* Campo para la cantidad necesaria */}
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
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


