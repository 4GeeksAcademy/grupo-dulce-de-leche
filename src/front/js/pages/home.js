import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import carne from "../../img/carne.png";
import spices1 from "../../img/spices1.png";
import spices2 from "../../img/spices2.png";
import spices3 from "../../img/spices3.png";
import imagen from "../../img/imagen.png";
import sal from "../../img/sal.png";
import hojas from "../../img/hojas.png";
import Leaf from "../../img/Leaf.png";
import Esparrago from "../../img/esparrago.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		// contenedor principal home
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
				<div className="row">
					<div className="col-sm-12 col-md-6">
						<img className="imagen" src={imagen} />
						<h3>Create your < br /> recipe now!</h3>
						<p className="blanco">Lorem ipsum dolor sit amet consectetur adipiscing elit. <br />Neque congue arcu amet consectetur adipiscing.</p>
					</div>
					<div className="col-sm-12 col-md-2">

					</div>
					<div className="col-sm-12 col-md-4">
						<p className="blanco">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque congue arcu</p>
						<img className="sal" src={sal} />
					</div>
				</div>
			</div>

			{/* contenedor recetas */}
			<div className="recipes container-fluid" style={{ backgroundImage: `url(${hojas})` }}>
				{/* style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/hojas.png'})` }} */}
				<div className="texto_uno">
					<h2>Save your <br /> recipes</h2>
					<p>This is a section of your menu. <br />
						Give your section a brief description</p>
				</div>

				{/* primera fila recetas */}
				<div className="row fila_receta_dos">
					<div className="col-sm-12 col-md receta_uno">
						<div className="row interior_receta">
							<div className="col">
							<p>Starters</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md receta_dos">
						<div className="row interior_receta">
							<div className="col">
							<p>Main</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md receta_tres">
						<div className="row interior_receta">
							<div className="col">
							<p>Dessert</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
				</div>
			
				{/* segunda fila recetas */}
				<div className="row fila_receta_dos">
					<div className="col-sm-12 col-md receta_uno">
						<div className="row interior_receta">
							<div className="col">
							<p>Starters</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md receta_dos">
						<div className="row interior_receta">
							<div className="col">
							<p>Main</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md receta_tres">
						<div className="row interior_receta">
							<div className="col">
							<p>Dessert</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
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
						<img className="esparrago" src={Esparrago} />	
							
						</div>
					</div>
					<div className="col-sm-12 col-md-4">
						<div className="row interior_receta">
						<img className="esparrago" src={Esparrago} />
						</div>
					</div>
					<div className="col-sm-12 col-md-4">
						<div className="row interior_receta">
						<img className="esparrago" src={Esparrago} />
						
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};
