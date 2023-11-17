import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import "../../styles/myproducts.css";
import croissant from "../../img/croissant.png";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/dashboard/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error(error);
        // Manejar el error, redireccionar, etc.
      }
    };

    if (token) {
      fetchProducts();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Container fluid>
      <Row className="principal-products">
        <Col xs={3} className="p-0 m-0">
          <AlmaCenaSidebar />
        </Col>
        <Col xs={9}>
          <div className="gris">
            <Row className="boton-categories">
              <Col sm={12} md={6}>
                <p>Categories: <span>All</span></p>
              </Col>
              <Col sm={12} md={6}>
                <Button variant="primary-product">Add new product</Button>
              </Col>
            </Row>

            <div className="myproducts bg-white">
              <Row xs={1} md={3} className="g-4">
                {products.map((product) => (
                  <Col key={product.receta_id}>
                    <Card>
                      <Card.Img variant="top" src={croissant} />
                      <Card.Body>
                        <Card.Title>{product.nombre}</Card.Title>
                        <div className="unidades-add">
                          <p className="card-text">{product.cantidad_inventario} ud</p>
                          <p className="card-text">Min: {product.cantidad_inventario_minimo} ud</p>
                          <p className="card-text">Clasificación: {product.clasificacion}</p>
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
