import "../css/cambiarContraseña.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

const schema = yup
  .object({
    currentPassword: yup
    .string()
    .required('La contraseña actual es requerida'),
  newPassword: yup
    .string()
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
    .required('La nueva contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
    .required('La confirmación de contraseña es requerida'),
  })
  .required();

const CambiarContraseña = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
});
  const { errores } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await axios.post("changePassword", data);
      // Contraseña cambiada con éxito, muestra un mensaje de éxito y redirige al usuario
      Alert("success", "Contraseña cambiada");
      navigate("/");
    } catch (error) {
      console.error(error.response.data.message);
      Alert("error", error.response.data.message);
    }
  };

  return (
    <div className="cambiarContraseña">
      <form className="input-register" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="currentPassword">Contraseña actual</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("currentPassword", { required: true })}
            className="input inputCambiar"
            placeholder="Ingrese su contraseña actual"
          />
          {errors.currentPassword && <p className="input-error-message">{errors.currentPassword.message}</p>}


          <label htmlFor="newPassword">Nueva contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("newPassword", { required: true })}
            className="input inputCambiar"
            placeholder="Ingrese su nueva contraseña"
          />
          {errors.newPassword && <p className="input-error-message">{errors.newPassword.message}</p>}

          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword", { required: true })}
            className="input inputCambiar"
            placeholder="Confirme su nueva contraseña"
          />
          {errors.confirmPassword && <p className="input-error-message">{errors.confirmPassword.message}</p>}
        </div>
        <div className="password-container">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-btn"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn btn-send">
            Restablecer Contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default CambiarContraseña;
