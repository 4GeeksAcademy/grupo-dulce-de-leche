import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteRecipeButton = ({ recipe, onRecipeDeleted }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteRecipe = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/dashboard/recipes/${recipe.receta_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting recipe");
      }

      handleClose();

    
      if (onRecipeDeleted) {
        onRecipeDeleted();
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {recipe.nombre}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteRecipe}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteRecipeButton;
