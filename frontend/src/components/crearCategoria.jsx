import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import "../css/crearCategoria.css"
import "../css/inputs.css"
import axios from '../api/axios'
import Alert from './Alert'

const schema = yup
	.object({
		categoria: yup.string().min(4, "Mínimo 4 caracteres").required(),
	})
	.required()

export default function CrearCategoria() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = async (data) => {
		try{
			await axios.post(process.env.REACT_APP_BASE_URL + "crear-categoria", data)
		} catch (e) {
			Alert("error", "Error al crear la categoria");
			return
		}
		Alert("success", "¡Categoria creada!");
		reset();
	}

	return (
		<div className="newCategoria">
			<form onSubmit={handleSubmit(onSubmit)} className="form-newCategoria container">
				<div className="input-container-newCategoria">
					<input {...register("categoria")} className="input-newCategoria input" autoComplete="off" placeholder="Nombre de la categoria" />
					<p className="input-error-message">{errors.categoria?.message}</p>
				</div>
				<button type="submit" className="btn btn-crear">Crear</button>
			</form>
		</div>
	)
		
}
