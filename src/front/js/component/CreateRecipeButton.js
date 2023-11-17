import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col, InputGroup } from 'react-bootstrap';

const CreateRecipeButton = ({ onRecipeCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    rinde: '',
    unidad_medida: '',
    ingredientes: []
  });
  const [userMateriasPrimas, setUserMateriasPrimas] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar una solicitud para obtener las materias primas del usuario
    const fetchUserMateriasPrimas = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/user-materias-primas", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user materias primas");
        }

        const data = await response.json();
        setUserMateriasPrimas(data); // Actualiza el estado con las materias primas del usuario
      } catch (error) {
        console.error("Error fetching user materias primas:", error);
      }
    };

    fetchUserMateriasPrimas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, property, value) => {
    const updatedIngredients = [...formData.ingredientes];
    updatedIngredients[index][property] = value;

    setFormData({
      ...formData,
      ingredientes: updatedIngredients,
    });
  };

  const handleAddIngredient = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredientes: [
        ...prevData.ingredientes,
        { materia_prima_id: '', cantidad_necesaria: 0 },
      ],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error creating recipe");
      }

      // Después de enviar los datos, cierra el modal
      setShowModal(false);

      // Llama a la función de retorno de llamada para actualizar la lista de recetas
      if (onRecipeCreated) {
        onRecipeCreated();
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      // Maneja el error aquí según tus necesidades
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Crear Receta
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Receta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre de la Receta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la receta"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRinde">
              <Form.Label>Rinde</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rinde"
                name="rinde"
                value={formData.rinde}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formUnidadMedida">
              <Form.Label>Unidad de Medida</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unidad de medida"
                name="unidad_medida"
                value={formData.unidad_medida}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formIngredientes">
              <Form.Label>Ingredientes</Form.Label>
              {formData.ingredientes.map((ingrediente, index) => (
                <Form.Row key={index}>
                  <Col>
                    <Form.Control
                      as="select"
                      value={ingrediente.materia_prima_id}
                      onChange={(e) => handleIngredientChange(index, 'materia_prima_id', e.target.value)}
                    >
                      <option value="" disabled>
                        Seleccione una materia prima
                      </option>
                      {userMateriasPrimas.map((materiaPrima) => (
                        <option key={materiaPrima.id} value={materiaPrima.id}>
                          {materiaPrima.nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                  <Form.Control
                    type="number"
                    placeholder="Cantidad necesaria"
                    value={ingrediente.cantidad_necesaria}
                    onChange={(e) => handleIngredientChange(index, 'cantidad_necesaria', e.target.value)}
                  />
                  </Col>
                </Form.Row>
              ))}
              <Button variant="outline-primary" onClick={handleAddIngredient}>
                Agregar Ingrediente
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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

export default CreateRecipeButton;
