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
		<div class="contenedor-fluid">

			{/* contenedor presentación */}
			<div class="start">
				<div class="row fondo" style={{ backgroundImage: `url(${carne})` }}>
					<div class="col intro">
						<h1>Keep track of < br />your stuff like < br /> never before</h1>
						<p class="blanco">Lorem ipsum dolor sit amet, consectetur <br />adipiscing elit. Neque congue arcu</p>
					</div>
				</div>
				<div class="row especias">
					<div class="col"></div>
					<div class="col"><img class="spices" src={spices1} /></div>
					<div class="col"><img class="spices" src={spices2} /></div>
					<div class="col"><img class="spices" src={spices3} /></div>
					<div class="col"></div>
				</div>
				<div class="row">
					<div class="col-6">
						<img class="imagen" src={imagen} />
						<h3>Create your < br /> recipe now!</h3>
						<p class="blanco">Lorem ipsum dolor sit amet consectetur adipiscing elit. <br />Neque congue arcu amet consectetur adipiscing.</p>
					</div>
					<div class="col-2">

					</div>
					<div class="col-4">
						<p class="blanco">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque congue arcu</p>
						<img class="sal" src={sal} />
					</div>
				</div>
			</div>

			{/* contenedor recetas */}
			<div class="recipes container-fluid" style={{ backgroundImage: `url(${hojas})` }}>
				{/* style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/hojas.png'})` }} */}
				<div class="texto_uno">
					<h2>Save your <br /> recipes</h2>
					<p>This is a section of your menu. <br />
						Give your section a brief description</p>
				</div>

				{/* primera fila recetas */}
				<div class="row fila_receta_uno">
					<div class="col receta_uno">
						<div class="row interior_receta">
							<div class="col">
								<p>Starters</p>
							</div>
							<div class="col">
								<i class="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div class="col receta_dos">
						<div class="row interior_receta">
							<div class="col">
							<p>Main</p>
							</div>
							<div class="col">
								<i class="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div class="col receta_tres">
						<div class="row interior_receta">
							<div class="col">
							<p>Dessert</p>
							</div>
							<div class="col">
								<i class="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
				</div>

				{/* segunda fila recetas */}
				<div class="row fila_receta_dos">
					<div class="col receta_uno">
						<div class="row interior_receta">
							<div class="col">
							<p>Starters</p>
							</div>
							<div class="col">
								<i class="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div class="col receta_dos">
						<div class="row interior_receta">
							<div class="col">
							<p>Main</p>
							</div>
							<div class="col">
								<i class="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div class="col receta_tres">
						<div class="row interior_receta">
							<div class="col">
							<p>Dessert</p>
							</div>
							<div class="col">
								<i class="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
				</div>
			</div>



			{/* contenedor inventory */}
			<div class="inventory container-fluid">
				<div class="texto_uno">
					<div class="row">
					<div class="col-1">
						</div>
						<div class="col-4">
							<img class="leaf" src={Leaf} />
						</div>
						<div class="col-2">
						</div>
						<div class="col-5">
							<h2>Keep your inventory up to date </h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Purus lorem id penatibus imperdiet. Turpis egestas ultricies
								purus auctor tincidunt lacus nunc.
							</p>
						</div>
					</div>
				</div>

				{/* primera fila recetas */}
				<div class="row fila_receta_uno">
					<div class="col">
						<div class="row interior_receta">
						<img class="esparrago" src={Esparrago} />	
							
						</div>
					</div>
					<div class="col">
						<div class="row interior_receta">
						<img class="esparrago" src={Esparrago} />
						</div>
					</div>
					<div class="col">
						<div class="row interior_receta">
						<img class="esparrago" src={Esparrago} />
						
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};
