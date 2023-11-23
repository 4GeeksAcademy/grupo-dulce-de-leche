import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditIngredientButton = ({ ingredient, onIngredientUpdated }) => {
  const [show, setShow] = useState(false);
  const [cantidadStock, setCantidadStock] = useState(ingredient.cantidad_stock);
  const [minimoStock, setMinimoStock] = useState(ingredient.cantidad_stock);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setCantidadStock(ingredient.cantidad_stock);
    setMinimoStock(ingredient.minimo_stock);
    setShow(true);
  };

  const handleUpdateIngredient = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/ingredients", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify({
          materia_prima_id: ingredient.materia_prima_id,
          cantidad_stock: cantidadStock,
          minimo_stock: minimoStock,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating ingredient");
      }

      // Cierra el modal
      handleClose();

      // Llama a la función onIngredientUpdated para actualizar la lista de ingredientes
      if (onIngredientUpdated) {
        onIngredientUpdated();
      }
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  return (
    <>
      <Button variant="warning edit-ingredients" onClick={handleShow}>
      <i class="fa-regular fa-pen-to-square"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCantidadStock">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cantidad stock"
                value={cantidadStock}
                onChange={(e) => setCantidadStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMinimoStock">
              <Form.Label>Alert Me When I Have</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter minimo stock"
                value={minimoStock}
                onChange={(e) => setMinimoStock(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateIngredient}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditIngredientButton;
