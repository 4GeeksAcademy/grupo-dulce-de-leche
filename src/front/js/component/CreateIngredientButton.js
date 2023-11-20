import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const CreateIngredientButton = ({ onIngredientCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    clasificacion: "",
    unidad_medida: "",
    cantidad: 0,
    minimo_stock: 0,
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
      const token = localStorage.getItem("jwt-token");
  
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Error creating ingredient");
      }
  
      setShowModal(false);
  
      if (onIngredientCreated) {
        onIngredientCreated();
      }
    } catch (error) {
      console.error("Error creating ingredient:", error);
      // Maneja el error
    }
  };
  
  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        New Ingredient
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del ingrediente"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formClasificacion">
              <Form.Label>Classification</Form.Label>
              <Form.Control
                type="text"
                placeholder="Clasificación del ingrediente"
                name="clasificacion"
                value={formData.clasificacion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formUnidadMedida">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unidad de medida"
                name="unidad_medida"
                value={formData.unidad_medida}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCantidad">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMinimoStock">
              <Form.Label>Alert Me When I Have</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mínimo Stock"
                name="minimo_stock"
                value={formData.minimo_stock}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateIngredientButton;