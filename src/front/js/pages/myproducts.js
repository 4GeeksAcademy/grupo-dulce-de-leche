import React, { useContext, useState } from "react";
import "../../styles/myproducts.css";
import croissant from "../../img/croissant.png";
import { Row } from "react-bootstrap";
import AlmaCenaSidebar from "../component/AlmaCenaSidebar";




export const MyProducts = () => {

  
  return (

    <> <AlmaCenaSidebar />
    <div className="container-fluid">
    
 
      <div className="row principal-recipes">
        <div className="col gris">
        <div class="row boton-categories">
    <div class="col-sm-12 col-md-6">
      <p>Categories: <span>All</span> </p>
    </div>
    <div class="col-sm-12 col-md-6">
    <button class="btn btn-primary-product">Add new product</button>
    </div>
    </div>

    <div className="myproducts bg-white">

<div class="row row-cols-1 row-cols-md-3 g-4">
  {/* Card 1 */}
  <div class="col">
  <div className="card">
    <img className="croissant" src={croissant} />
  <div className="card-body">
    <h5 className="card-title">Croissant</h5>
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
    <img className="croissant" src={croissant} />
  <div className="card-body">
    <h5 className="card-title">Croissant</h5>
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
    <img className="croissant" src={croissant} />
  <div className="card-body">
    <h5 className="card-title">Croissant</h5>
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
    <img className="croissant" src={croissant} />
  <div className="card-body">
    <h5 className="card-title">Croissant</h5>
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
    </>
  );
};