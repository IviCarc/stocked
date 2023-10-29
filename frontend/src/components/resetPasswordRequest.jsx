import "../css/resetPasswordRequest.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "./Alert";
import axios from "axios";
const schema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido')
    .test('is-com', 'Debe terminar en ".com"', (value) => {
      if (value && yup.string().email().isValidSync(value)) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);;
      }
      return true; // No se aplica la validación si el campo está vacío o no es un correo electrónico válido
    }),
}).required();

const ResetPasswordRequest = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleResetPasswordRequest = async (data) => {
    Swal.showLoading()
    try{
      await axios.post(process.env.REACT_APP_BASE_URL + "api/reset-password-request", data)
    } catch (e) {
      Alert("error", e.response.data.message)
      return
    }
    Swal.close()
    Alert("success", "Solicitud de restablecimiento enviada.")
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(handleResetPasswordRequest)} className="resetPasswordRequest">
      <h1 className="title">STOCKED</h1>
      <h4 className="subtitle">
        Ingrese el correo de su cuenta. En caso de ser correcto, le llegará un correo con el token de restablecimiento.
      </h4>
      <div className="input-container">
        <label htmlFor="email"></label>
        <input
          type="email"
          {...register("email")}
          className="input"
          name="email"
          placeholder="Ingrese su correo electrónico"
        />
        {errors.email && <p className="input-error-message">{errors.email.message}</p>}
      </div>
      <div className="btn-container">
        <Link className="backLink" to="http://localhost:3000/login/">
          <button className="btn btn-back">Volver</button>
        </Link>
        <button type="submit" className="btn btn-send">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordRequest;
