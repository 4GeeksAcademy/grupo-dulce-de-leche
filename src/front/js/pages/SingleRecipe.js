import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";
import "../../styles/singlerecipe.css";
import singlerecipe from "../../img/singlerecipe.png";

const SingleRecipe = () => {
  const navigate = useNavigate();
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`URL_DEL_BACKEND/api/recipe/${recipe_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const recipeData = await response.json();
        setRecipe(recipeData);
      } catch (error) {
        console.error(error);
        // Manejar el error, redireccionar, etc.!!!!!!
      }
    };
    
    fetchRecipe();
  }, [token, recipe_id]);
  
  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <AlmaCenaSidebar />
      <div className="container-fluid">
        <div className="row principal">
          <div className="col gris">
            <div className="row boton-categories">
              <div className="col-sm-12 col-md-6">
                <h3 className="titulo-single-recipe">{recipe ? recipe.nombre : "Loading..."}</h3>
              </div>
              <div className="col-sm-12 col-md-6">
                <button className="btn btn-primary-product">Edit Recipe</button>
              </div>
            </div>
            <div className="profile-user bg-white">
              <h4 className="personal">Recipe information</h4>
              <div className="row foto">
                <div className="col-sm-12 col-md-4 imgsinglerecipe" style={{ backgroundImage: `url(${singlerecipe})` }}></div>
                <div className="col-sm-12 col-md-8">
                  <div className="table-totalyield">
                    <table className="table single recipe">
                    <tr>
                      <th className="threcipe" scope="col"> Total Yield</th>
                      </tr>
                    <tr className="trsinglerecipe">
                      <td className="tdsinglerecipe"> 100 </td>
                      <td className="tdsinglerecipe"> Ud. </td>
                    </tr>
                  </table>
                  </div>
                  <div className="table-ingredients">
                  <table className="table single recipe ">
                    <tr>
                      <th className="threcipe" scope="col">Qty</th>
                      <th className="threcipe" scope="col">Unit</th>
                      <th className="threcipe" scope="col">Ingredient</th>
                    </tr>
                    <tr className="trsinglerecipe">
                      <td className="tdsinglerecipe"> 100 </td>
                      <td className="tdsinglerecipe"> Ud. </td>
                      <td className="tdsinglerecipe"> Manteca</td>
                    </tr>
                    <tr className="trsinglerecipe">
                      <td className="tdsinglerecipe"> 100 </td>
                      <td className="tdsinglerecipe"> Ud. </td>
                      <td className="tdsinglerecipe"> Huevos</td>
                    </tr>
                    <tr className="trsinglerecipe">
                      <td className="tdsinglerecipe"> 100 </td>
                      <td className="tdsinglerecipe"> Ud. </td>
                      <td className="tdsinglerecipe"> Leche</td>
                    </tr>
                    <tr className="trsinglerecipe">
                      <td className="tdsinglerecipe"> 100 </td>
                      <td className="tdsinglerecipe"> Ud. </td>
                      <td className="tdsinglerecipe"> Harina</td>
                    </tr>
                  </table>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SingleRecipe;