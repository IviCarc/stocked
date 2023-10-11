import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "../css/product.css";
import axios from "axios";


const Product = (props) => {

	const navigate = useNavigate();

	const handleEliminarProducto = async (productId) => {
		try {
			// Mostrar una ventana de confirmación antes de eliminar
			const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

			if (confirmDelete) {
				const res = await fetch(`http://localhost:5000/eliminar-producto/${productId}`, {
					method: 'DELETE',
				});
				if (res.status === 204) {
					// Redirige a la página de stock
					navigate('/');
					window.location.reload();
				}
			}
		} catch (error) {
			console.error('Error al eliminar el producto:', error);
		}
	};

	const id = useLocation().pathname.split("/")[2]; // ID

	const [producto, setProducto] = useState(null);

	const obtenerProducto = async () => {
		const categorias = await axios.get(process.env.REACT_APP_BASE_URL + 'producto/' + id);
		setProducto(categorias.data);
		console.log(categorias.data)
	}

	const [isEditing, setIsEditing] = useState(false); // Agrega estado para el modo de edición

	const editarProducto = async () => {
		if (isEditing) {
			const res = await axios.put(process.env.REACT_APP_BASE_URL + 'editar-producto/', producto);
			if (res.status === 200) {
				alert("guardado")
			}
			if (res.status == 204) {
				alert("no guardado")
			}
		}
		setIsEditing(!isEditing); // Cambiar el estado directamente al contrario del valor actual
	};

	const onChange = async (e, setter, state) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;

		setter({
			...state,
			[inputName]: inputValue
		});

	};

	const capitalizeFirstLetter = (str) => {
		const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
		return capitalized;
	}
	const [listaCategorias, setListaCategorias] = useState(null);
	const obtenerCategorias = async () => {
		const categorias = await axios.get(process.env.REACT_APP_BASE_URL + 'categorias');
		setListaCategorias(categorias.data);
	}

	const sumarUnidad = (e) => {
		console.log()
		e.target.className.baseVal.includes("iconMinus") ?
			setProducto({ ...producto, cantidadDisponible: producto.cantidadDisponible - 1 }) :
			setProducto({ ...producto, cantidadDisponible: producto.cantidadDisponible + 1 });
	}

	useEffect(() => {
		obtenerProducto()
			.catch(e => {
				console.error(e)
			})
		obtenerCategorias()
			.catch(e => {
				console.error(e)
			})
	}, [])

	return (
		<div className="producto">
			<div className="container-product">
				{producto ?
					<>

						<div className="about-producto">
							<div className="img-product">
								<img src={`${process.env.REACT_APP_BASE_URL + "images/" + producto.imagen}`} alt="adawd" />
							</div>
							<div className="price-producto">
								<button className="btn-edit" id="editProduct" onClick={editarProducto}>
									<p>
										<b>{isEditing ? "Guardar" : "Editar"}</b>{" "}
										<FontAwesomeIcon icon={faPenToSquare} className="editIconProduct" />
									</p>
								</button>
								<hr />
								<button onClick={() => handleEliminarProducto(
									producto._id
								)}><p><b>Eliminar</b> <FontAwesomeIcon icon={faTrash} className="trashIconProduct" /> </p></button>
							</div>
						</div>


						<div className="info-producto">
							<div className="info-titulo">
								{capitalizeFirstLetter(producto.producto)}
							</div>
							<div className="info-cont">

								{
									Object.keys(producto).map((key, index) => {
										if (key !== "__v" && key !== "cantidadDisponible" && key !== "_id" && key !== "producto" && key !== 'categoria' && key !== 'imagen') {
											return (
												<div className="caracteristica-container" key={index}>
													<label for={key}>{capitalizeFirstLetter(key)}:</label>
													<input type="text" className={isEditing ? "input info-input" : "input-editing"}
														disabled={!isEditing}
														value={producto[key]}
														onChange={(e) => onChange(e, setProducto, producto)}
														name={key}
													/>
												</div>
											);
										}

										if (key == 'categoria') {
											return (
												<div className="caracteristica-container" key={index}>
													<label htmlFor="categoria">{capitalizeFirstLetter(key)}</label>
													<div className={"select select-container-product" + (!isEditing ? " not-editable" : "")}>
														<select name="categoria" id="" className={"select-product" + (!isEditing ? " not-editable" : "")} onChange={(e) => onChange(e, setProducto, producto)} >
															{listaCategorias && listaCategorias.map((categoria, i) => {
																return <option className="" key={i} value={categoria.categoria}>{capitalizeFirstLetter(categoria.categoria)}</option>
															})}

														</select>

													</div>
												</div>
											)
										}

									}


									)
								}
							</div>
							<div className="info-unidades">
								<p>Unidades Disponibles:</p>

								<FontAwesomeIcon icon={faMinus} className={isEditing ? "iconMinus" : "disabled"} onClick={sumarUnidad} />
								<p>{producto.cantidadDisponible}</p>
								<FontAwesomeIcon icon={faPlus} className={isEditing ? "iconPlus" : "disabled"} onClick={sumarUnidad} />
							</div>
						</div>

					</>


					:



					<div></div>}

			</div>



		</div>
	);
};

export default Product;


