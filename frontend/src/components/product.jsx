import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "../css/product.css";
import "../css/inputs.css";
import axios from '../api/axios'
import Alert from "./Alert";
import Swal from 'sweetalert2'

const Product = (props) => {

	const navigate = useNavigate();

	const handleEliminarProducto = async (productId, productCategoria) => {
		Swal.fire({
			title: 'Estás seguro de que deseas eliminar el producto?',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			denyButtonText: `Cancelar`,
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await axios.delete(`http://localhost:5000/eliminar-producto/${productId}/${productCategoria}`);
				} catch (e) {
					Alert("error", "Error al eliminar el producto");
					return
				}
				Alert("success", "Producto eliminado");
				setTimeout(() => {
					navigate('/');
					window.location.reload();
				}, 1500)
			}
		})
	};

	const id = useLocation().pathname.split("/")[2]; // ID

	const [producto, setProducto] = useState(null);

	const obtenerProducto = async () => {
		const categorias = await axios.get(process.env.REACT_APP_BASE_URL + 'producto/' + id);
		setProducto(categorias.data);
	}

	const [isEditing, setIsEditing] = useState(false); // Agrega estado para el modo de edición

	const editarProducto = async () => {
		if (isEditing) {
			try {
				await axios.put(process.env.REACT_APP_BASE_URL + 'editar-producto/', producto);
			} catch (e) {
				Alert("error", "Error al editar el producto");
				return
			}
			Alert("success", "Producto editado correctamente");
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
		if (e.target.className.baseVal.includes("iconMinus")) {
			if (producto.cantidadDisponible > 0) {
				setProducto({ ...producto, cantidadDisponible: producto.cantidadDisponible - 1 });
			}
		} else {
			setProducto({ ...producto, cantidadDisponible: producto.cantidadDisponible + 1 });
		}
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
								<button className="btn-edit" onClick={editarProducto}>
									<p>
										<b>{isEditing ? "Guardar" : "Editar"}</b>{" "}
										<FontAwesomeIcon icon={faPenToSquare} className="editIconProduct" />
									</p>
								</button>
								<hr />
								<button className="btn-edit" onClick={() => handleEliminarProducto(producto._id, producto.categoria)}>
									<p> <b>Eliminar</b>
										<FontAwesomeIcon icon={faTrash} className="trashIconProduct" />
									</p>
								</button>
							</div>
						</div>


						<div className="info-producto">
							<div className="info-titulo">
								{capitalizeFirstLetter(producto.producto)}
							</div>
							<div className="info-cont">

								{
									Object.keys(producto).map((key, index) => {
										if (key != 'descripcion' && key !== "__v" && key !== "cantidadDisponible" && key !== "_id" && key !== "producto" && key !== 'categoria' && key !== 'imagen') {
											return (
												<div className="caracteristica-container" key={index}>
													<label htmlFor={key}><b>{capitalizeFirstLetter(key)}</b>:</label>
													<input type="text" className={isEditing ? "input info-input" : " input info-input input-editing"}
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
													<label htmlFor="categoria"><b>{capitalizeFirstLetter(key)}</b></label>
													<div className={"select select-container-product" + (!isEditing ? " not-editable" : "")}>
														<select name="categoria" id="" className={"select-product" + (!isEditing ? " not-editable" : "")} onChange={(e) => onChange(e, setProducto, producto)} >
															{listaCategorias && listaCategorias.map((categoria, i) => {
																return <option className="" key={categoria._id} value={categoria.categoria}>{capitalizeFirstLetter(categoria.categoria)}</option>
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
							<div className="caracteristica-container" id="descripcion-container" >
								<label htmlFor='categoria'><b>Descripción del producto</b>:</label>
								<textarea className={isEditing ? "input info-input" : "input info-input input-editing"} disabled={!isEditing}
									name="descripcion" id="descripcion"
									onChange={(e) => onChange(e, setProducto, producto)}
									value={producto.descripcion}
									col="30" 
									rows="5"
								>

								</textarea>
							</div>
							<div className="info-unidades">
								<p><b>Unidades Disponibles:</b></p>

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


