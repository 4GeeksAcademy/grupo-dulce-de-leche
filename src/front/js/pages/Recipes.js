import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/myproducts.css";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import CreateRecipeButton from "../component/CreateRecipeButton";

export const Recipes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  if (!token) {
    navigate("/login");
  }

  const fetchData = async () => {
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

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleRecipeCreated = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/dashboard/recipes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching updated recipes");
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching updated recipes:", error);
    }
  };

  return (
    <div className="contain">
      <div class="row">
        <div class="col-2">
          <AlmaCenaSidebar />
        </div>
        <div class="col-10">
          <div className="row principal-recipes">
            <div className="col gris">
              <div class="row boton-categories">
                <div class="col-sm-12 col-md-6">
                  <p>Categories: <span>All</span> </p>
                </div>

                <div class="col-sm-12 col-md-6">
                <CreateRecipeButton onRecipeCreated={handleRecipeCreated} />

                </div>
              </div>

              <div className="myproducts bg-white">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                  {recipes.map((recipe) => (
                    <div key={recipe.receta_id} class="col">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{recipe.nombre}</h5>
                          <p className="card-text">Cantidad en inventario: {recipe.cantidad_inventario}</p>
                          {/* Renderiza otros detalles de la receta según tu estructura de datos */}
                        </div>
                      </div>
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
