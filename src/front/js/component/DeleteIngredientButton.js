import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteIngredientButton = ({ ingredient, onIngredientDeleted }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDeleteIngredient = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/ingredients", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify({
          materia_prima_id: ingredient.materia_prima_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error deleting ingredient");
      }

      // Cierra el modal
      handleClose();

      // Llama a la función onIngredientDeleted para actualizar la lista de materias primas
      if (onIngredientDeleted) {
        onIngredientDeleted();
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  return (
    <>
      <Button variant="danger delete-recipe" onClick={handleShow}>
      <i className="fa-regular fa-trash-can"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the ingredient: {ingredient.nombre}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteIngredient}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteIngredientButton;
