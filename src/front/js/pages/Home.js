import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import carne from "../../img/carne.png";
import spices1 from "../../img/spices1.png";
import spices2 from "../../img/spices2.png";
import spices3 from "../../img/spices3.png";
import imagen from "../../img/imagen.png";
import sal from "../../img/sal.png";
import hojas from "../../img/hojas.png";
import Leaf from "../../img/Leaf.png";
import inventary1 from "../../img/inventary1.png";
import inventary2 from "../../img/inventary2.png";
import inventary3 from "../../img/inventary3.png";

import { MenuNavegacion } from "../component/AlmaCenaNavbar.js";
import ControlledCarousel from "../component/ControlledCarousel.js";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
<>
<MenuNavegacion />	

		<div className="contenedor-fluid">

			{/* contenedor presentación */}
			<div className="start">
				<div className="row fondo-carne" style={{ backgroundImage: `url(${carne})` }}>
					<div className="col intro">
					<img className="carne-movil" src={carne} />
						<h1>Keep track of < br />your stuff like < br /> never before</h1>
						<p className="blanco">Lorem ipsum dolor sit amet, consectetur <br />adipiscing elit. Neque congue arcu</p>
						
					</div>
				</div>
				<div className="row especias">
					<div className="col vacia"></div>
					<div className="col"><img className="spices" src={spices1} /></div>
					<div className="col"><img className="spices" src={spices2} /></div>
					<div className="col"><img className="spices" src={spices3} /></div>
					<div className="col vacia"></div>
				</div>
			</div>

			{/* contenedor recetas */}
			<div className="recipes container-fluid" style={{ backgroundImage: `url(${hojas})` }}>
				{/* style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/hojas.png'})` }} */}
				<div className="texto_uno">
					<h2>How it works?</h2>
					<ControlledCarousel />
					</div>
				</div>
			{/* contenedor inventory */}
			<div className="inventory container-fluid">
				<div className="texto_uno">
					<div className="row">
					<div className="col-sm-12 col-md-1">
						</div>
						<div className="col-sm-12 col-md-4">
							<img className="leaf" src={Leaf} />
						</div>
						<div className="col-sm-12 col-md-2">
						</div>
						<div className="col-sm-12 col-md-5">
							<h2>Keep your inventory up to date </h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Purus lorem id penatibus imperdiet. Turpis egestas ultricies
								purus auctor tincidunt lacus nunc.
							</p>
						</div>
					</div>
				</div>

				{/* primera fila recetas */}
				<div className="row fila_receta_uno">
					<div className="col-sm-12 col-md-4">
						<div className="row interior_receta">
						<img className="esparrago" src={inventary1} />	
							
						</div>
					</div>
					<div className="col-sm-12 col-md-4">
						<div className="row interior_receta">
						<img className="esparrago" src={inventary2} />
						</div>
					</div>
					<div className="col-sm-12 col-md-4">
						<div className="row interior_receta">
						<img className="esparrago" src={inventary3} />
						
						</div>
					</div>
				</div>
			</div>

		</div>
		</>
	);
};

