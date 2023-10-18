import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import "../css/crearCategoria.css"
import "../css/inputs.css"
import axios from '../api/axios'

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
	} = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = async (data) => {
		await axios.post(process.env.REACT_APP_BASE_URL + "crear-categoria", data)
	}

	return (
		<div className="newCategoria">
			<form onSubmit={handleSubmit(onSubmit)} className="form-newCategoria container">
				<div className="input-container-newCategoria">
					<input {...register("categoria")} className="input-newCategoria input" autoComplete="off" placeholder="Nombre de la categoria" />
					<p className="input-error-message">{errors.categoria?.message}</p>
				</div>
				<button type="submit" className="btn">Crear</button>
			</form>
		</div>
	)
		
}
