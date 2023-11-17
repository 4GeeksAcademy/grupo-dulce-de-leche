import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CreateProductButton = ({ onProductCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    receta_nombre: '',
    cantidad_inventario: 0,
    clasificacion: '',
    cantidad_inventario_minimo: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error creating product");
      }

      const productData = await response.json();

      // Después de enviar los datos, cierra el modal
      handleClose();

      // Almacena el nuevo producto en el estado local
      if (onProductCreated) {
        onProductCreated(productData.product);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      // Maneja el error aquí según tus necesidades
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Crear Producto
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRecetaNombre">
              <Form.Label>Nombre de la Receta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la receta"
                name="receta_nombre"
                value={formData.receta_nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCantidadInventario">
              <Form.Label>Cantidad en Inventario</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad en inventario"
                name="cantidad_inventario"
                value={formData.cantidad_inventario}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClasificacion">
              <Form.Label>Clasificación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Clasificación del producto"
                name="clasificacion"
                value={formData.clasificacion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCantidadInventarioMinimo">
              <Form.Label>Cantidad Mínima en Inventario</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad mínima en inventario"
                name="cantidad_inventario_minimo"
                value={formData.cantidad_inventario_minimo}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateProductButton;
