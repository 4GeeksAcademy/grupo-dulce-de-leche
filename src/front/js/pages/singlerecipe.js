import React, { useContext, useState } from "react";
import "../../styles/singlerecipe.css";
import singlerecipe from "../../img/singlerecipe.png";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";


export const SingleRecipe = () => {


  return (
    <> <AlmaCenaSidebar/>
    <div className="container-fluid">
      <div className="row principal">
        <div className="col gris">
          <div class="row boton-categories">
            <div class="col-sm-12 col-md-6">
              <h3 className="titulo-single-recipe">Croissants</h3>
            </div>
            <div class="col-sm-12 col-md-6">
              <button class="btn btn-primary-product">Edit Recipe</button>
            </div>
          </div>

          <div className="profile-user bg-white">
            <h4 className="personal">Recipe information</h4>
            <div class="row foto">
              <div className="col-sm-12 col-md-4 imgsinglerecipe" style={{ backgroundImage: `url(${singlerecipe})` }}>
              
              </div>
              <div class="col-sm-12 col-md-8">
                <div class="table-totalyield">
                  <table class="table single recipe">
                  
                    <tr>
                      <th className="threcipe" scope="col"> Total Yield</th>
                      </tr>
                    <tr className="trsinglerecipe">
                      <td className="tdsinglerecipe"> 100 </td>
                      <td className="tdsinglerecipe"> Ud. </td>
                    </tr>
                  </table>

                  </div>

                  <div class="table-ingredients">
                  <table class="table single recipe ">
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