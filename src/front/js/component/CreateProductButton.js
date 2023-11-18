import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CreateProductButton = ({ onProductCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    receta_nombre: '',
    cantidad_inventario: 0,
    clasificacion: '',
    cantidad_inventario_minimo: 0,
  });
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []); 

  const fetchRecipes = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching recipes");
      }

      const recipes = await response.json();
      setRecipeList(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

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

      handleClose();

      if (onProductCreated) {
        onProductCreated(productData);
      }
    } catch (error) {
      console.error("Error creating product:", error);
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
                as="select"
                name="receta_nombre"
                value={formData.receta_nombre}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select one Recipe Name
                </option>
                {recipeList.map((recipe) => (
                  <option key={recipe.id} value={recipe.nombre}>
                    {recipe.nombre}
                  </option>
                ))}
              </Form.Control>
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

