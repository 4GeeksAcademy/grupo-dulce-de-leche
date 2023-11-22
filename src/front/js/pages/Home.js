import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { MenuNavegacion } from "../component/AlmaCenaNavbar.js";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
<>
<MenuNavegacion />	

		<div className="contenedor-fluid">

			{/* contenedor presentación */}
			<div className="start">
				<div className="row fondo-carne" style={{ backgroundImage: `url(https://res.cloudinary.com/ddc0clufh/image/upload/v1700682510/carne_uiamwy.png)`}}>
					<div className="col intro">
					<img className="carne-movil" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682510/Image_cj5qsm.png" />
						<h1>Keep track of < br />your stuff like < br /> never before</h1>
						<p className="blanco">Lorem ipsum dolor sit amet, consectetur <br />adipiscing elit. Neque congue arcu</p>
						
					</div>
				</div>
				<div className="row especias">
					<div className="col vacia"></div>
					<div className="col"><img className="spices" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682509/spices1_fisoa6.png" /></div>
					<div className="col"><img className="spices" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682509/spices2_nksfaf.png" /></div>
					<div className="col"><img className="spices" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682509/spices3_iq71zw.png" /></div>
					<div className="col vacia"></div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-6">
						<img className="imagen" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682509/imagen_m8tvda.png" />
						<h3>Create your < br /> recipe now!</h3>
						<p className="blanco">Lorem ipsum dolor sit amet consectetur adipiscing elit. <br />Neque congue arcu amet consectetur adipiscing.</p>
					</div>
					<div className="col-sm-12 col-md-2">

					</div>
					<div className="col-sm-12 col-md-4">
						<p className="blanco">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque congue arcu</p>
						<img className="sal" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682509/sal_smp6lf.png" />
					</div>
				</div>
			</div>

			{/* contenedor recetas */}
			<div className="recipes container-fluid" style={{ backgroundImage: `url(https://res.cloudinary.com/ddc0clufh/image/upload/v1700682509/hojas_tffs3i.png)` }}>
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
					<div className="col-sm-12 col-md receta_cuatro">
						<div className="row interior_receta">
							<div className="col">
							<p>Starters</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md receta_cinco">
						<div className="row interior_receta">
							<div className="col">
							<p>Main</p>
							</div>
							<div className="col">
								<i className="fa-solid fa-arrow-right"></i>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md receta_seis">
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
							<img className="leaf" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682510/Leaf_uywxrc.png" />
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
						<img className="esparrago" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682510/inventary1_b0kyhq.png" />	
							
						</div>
					</div>
					<div className="col-sm-12 col-md-4">
						<div className="row interior_receta">
						<img className="esparrago" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682510/inventary2_r56klg.png" />
						</div>
					</div>
					<div className="col-sm-12 col-md-4">
						<div className="row interior_receta">
						<img className="esparrago" src="https://res.cloudinary.com/ddc0clufh/image/upload/v1700682510/inventary3_uvekqt.png"/>
						
						</div>
					</div>
				</div>
			</div>

		</div>
		</>
	);
};

