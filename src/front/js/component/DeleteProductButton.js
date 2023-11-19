import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteProductButton = ({ product, onProductDeleted }) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify({
            product_id: product.receta_id,
            
        }),
      });

      if (!response.ok) {
        throw new Error("Error deleting product");
      }

      // Cierra el modal
      handleClose();

      // Llama a la función onProductDeleted para actualizar la lista de productos
      if (onProductDeleted) {
        onProductDeleted();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {product.nombre}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductButton;
