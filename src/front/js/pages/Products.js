import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Button } from "react-bootstrap";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import CreateProductButton from "../component/CreateProductButton";

export const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching products");
      }

      const data = await response.json();
      setProducts(data);
      setError(null); // Limpiar el estado de error si la solicitud es exitosa
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again."); // Establecer el estado de error en caso de problemas
    }
  };

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="contain">
      <div className="row">
        <div className="col-2">
          <AlmaCenaSidebar />
        </div>
        <div className="col-10">
          <div className="row principal-recipes">
            <div className="col gris">
              <div className="row boton-categories">
                <div className="col-sm-12 col-md-6">
                  <p>
                    Categories: <span>All</span>{" "}
                  </p>
                </div>
                <div className="col-sm-12 col-md-6">
                  <CreateProductButton onProductCreated={handleProductCreated} />
                </div>
              </div>

              <div className="myproducts bg-white">
                {error && <p className="error-message">{error}</p>}
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {products.map((product) => (
                    <div className="col" key={product.receta_id}>
                      <Card>
                        <Card.Img variant="top" src={product.imagen_url} alt={product.receta_nombre} />
                        <Card.Body>
                          <Card.Title>{product.receta_nombre}</Card.Title>
                          <Card.Text>
                            Cantidad en Inventario: {product.cantidad_inventario}
                          </Card.Text>
                          <Button variant="primary">Detalles</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
