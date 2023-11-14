import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/myproducts.css";
import redvelvet from "../../img/redvelvet.png"
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";




export const Recipes = () => {
const navigate = useNavigate();
const token = localStorage.getItem("jwt-token");
  if (!token) {
  navigate("/login");
  }  
  return (
         
    <div className="contain">
    <div class="row">
    <div class="col-2">
    <AlmaCenaSidebar/>
    </div>
    <div class="col-10">
    <div className="row principal-recipes">
        <div className="col gris">
        <div class="row boton-categories">
    <div class="col-sm-12 col-md-6">
      <p>Categories: <span>All</span> </p>
    </div>
    <div class="col-sm-12 col-md-6">
    <button class="btn btn-primary-product">Add new recipe</button>
    </div>
    </div>

    <div className="myproducts bg-white">

<div class="row row-cols-1 row-cols-md-3 g-4">
  {/* Card 1 */}
  <div class="col">
  <div className="card">
    <img className="redvelvet" src={redvelvet} />
  <div className="card-body">
    <h5 className="card-title">Receta Red Velvet</h5>
    <div class="row unidades-add">
    <div class="col-10">
    <p className="card-text">1120 ud</p>
    </div>
    <div class="col-2">
    <i class="fa-solid fa-plus"></i>
    </div>
    </div>
  </div>
</div>
  </div>
  {/* Card 2 */}
  <div class="col">
  <div className="card">
    <img className="redvelvet" src={redvelvet} />
  <div className="card-body">
    <h5 className="card-title">Receta Red Velvet</h5>
    <div class="row unidades-add">
    <div class="col-10">
    <p className="card-text">1120 ud</p>
    </div>
    <div class="col-2">
    <i class="fa-solid fa-plus"></i>
    </div>
    </div>
  </div>
</div>
  </div>
  {/* Card 3 */}
  <div class="col">
  <div className="card">
    <img className="redvelvet" src={redvelvet} />
  <div className="card-body">
    <h5 className="card-title">Receta Red Velvet</h5>
    <div class="row unidades-add">
    <div class="col-10">
    <p className="card-text">1120 ud</p>
    </div>
    <div class="col-2">
    <i class="fa-solid fa-plus"></i>
    </div>
    </div>
  </div>
</div>
    
  </div>
  {/* Card 4 */}
  <div class="col">
  <div className="card">
    <img className="redvelvet" src={redvelvet} />
  <div className="card-body">
    <h5 className="card-title">Receta Red Velvet</h5>
    <div class="row unidades-add">
    <div class="col-10">
    <p className="card-text">1120 ud</p>
    </div>
    <div class="col-2">
    <i class="fa-solid fa-plus"></i>
    </div>
    </div>
  </div>
</div>
  </div>


</div>




    </div>
        
        </div>
      
      </div>
    </div>
    </div>



    </div>

  );
};