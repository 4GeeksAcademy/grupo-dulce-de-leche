import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Button, Container, Col } from "react-bootstrap";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import CreateProductButton from "../component/CreateProductButton";
import croissant from "../../img/croissant.png";
import EditProductButton from "../component/EditProductButton";
import DeleteProductButton from "../component/DeleteProductButton";

export const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        navigate("/login");
      }
      if (!response.ok) {
        throw new Error("Error fetching products");
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again.");
    }
  };

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleProductEdited = () => {
    fetchProducts();
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };

  return (
    <Container fluid>
      <Row className="principal-products">
      <Col md={4} lg={2} className="p-0 m-0" id="reduccion">
          <AlmaCenaSidebar />
        </Col>
        
        <Col md={8} lg={10} id="reduccion-uno">
          <div className="gris">
            <Row className="boton-categories">
              <Col sm={12} md={6}>
                <p>
                  Categories: <span>All</span>
                </p>
              </Col>
              <Col sm={12} md={6}>
                <CreateProductButton onProductCreated={handleProductCreated} />
              </Col>
            </Row>

            <div className="myproducts bg-white">
              <Row className="g-4 row row-cols-md-2 row-cols-lg-3 row-cols-1">
                {products.map((product) => (
                  <Col key={product.receta_id}>
                    <Card>
                      <Card.Img variant="top" src={croissant} />
                      <Card.Body>
                        <Card.Title className="fw-bold">{product.nombre}</Card.Title>
                        <div className="unidades-add">
                          <p className="card-text">
                            {product.cantidad_inventario} {product.unidad_medida}
                          </p>
                          <p className="card-text">Alert When: {product.cantidad_inventario_minimo}</p>
                          <p className="card-text">Classification: {product.clasificacion}</p>  
                          <Row>
                          <Col className="col-6"><EditProductButton product={product} onProductEdited={handleProductEdited} /> </Col>
                          <Col className="col-6"><DeleteProductButton product={product} onProductDeleted={handleProductDeleted} /> </Col>
                          </Row>
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
