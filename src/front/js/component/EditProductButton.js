import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditProductButton = ({ product, onProductEdited }) => {
  const [show, setShow] = useState(false);
  const [cantidadInventario, setCantidadInventario] = useState(product.cantidad_inventario || "");
  const [clasificacion, setClasificacion] = useState(product.clasificacion || "");
  const [cantidadInventarioMinimo, setCantidadInventarioMinimo] = useState(
    product.cantidad_inventario_minimo || ""
  );

  const handleClose = () => {
    setShow(false);
    setCantidadInventario(product.cantidad_inventario || "");
    setClasificacion(product.clasificacion || "");
    setCantidadInventarioMinimo(product.cantidad_inventario_minimo || "");
  };

  const handleShow = () => setShow(true);

  const handleEditProduct = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify({
          id: product.receta_id,
          cantidad_inventario: cantidadInventario,
          clasificacion: clasificacion,
          cantidad_inventario_minimo: cantidadInventarioMinimo,
        }),
      });

      if (!response.ok) {
        throw new Error("Error editing product");
      }

      handleClose();

      if (onProductEdited) {
        onProductEdited();
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
      <i class="fa-regular fa-pen-to-square"></i><span className="text-white ps-2 texto-boton">Edit</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCantidadInventario">
              <Form.Label>Cantidad Inventario</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cantidad inventario"
                value={cantidadInventario}
                onChange={(e) => setCantidadInventario(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formClasificacion">
              <Form.Label>Clasificacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter clasificacion"
                value={clasificacion}
                onChange={(e) => setClasificacion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCantidadInventarioMinimo">
              <Form.Label>Cantidad Inventario Mínimo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cantidad inventario mínimo"
                value={cantidadInventarioMinimo}
                onChange={(e) => setCantidadInventarioMinimo(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductButton;
