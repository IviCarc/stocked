import "../css/cambiarContraseña.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const CambiarContraseña = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { errores } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
  try {
    const response = await axios.post('changePassword', data)

    if (response.ok) {
      // La solicitud se completó con éxito (código 200)
      const responseData = await response.json();
      if (responseData.message === 'Contraseña cambiada con éxito') {
        // Contraseña cambiada con éxito, muestra un mensaje de éxito y redirige al usuario
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: responseData.message,
        });
        navigate('/stock');
      } else {
        // El servidor devolvió un mensaje inesperado
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Respuesta inesperada del servidor',
        });
      }
    } else if (response.status === 400) {
      // El servidor respondió con un código de estado 400 (Bad Request)
      const errorData = await response.json();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorData.message,
      });
    } else {
      // Otro error del servidor u error de red
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error en el servidor',
      });
    }
  } catch (error) {
    // Error de conexión: No se pudo conectar al servidor
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar al servidor',
    });
    console.error(error);
  }
};

  

  return (
    <div className="cambiarContraseña">
      {errores.map((error, i) => (
        <div className="error-div" key={i}>
          {error}
        </div>
      ))}
      <form className="input-register" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="currentPassword">Contraseña anterior</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("currentPassword", { required: true })}
            className="input inputCambiar"
            placeholder="Ingrese su contraseña anterior"
          />
          {errors.oldPassword && (
            <p className="error-msj">Contraseña anterior es requerida</p>
          )}
          <label htmlFor="newPassword">Nueva contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("newPassword", { required: true })}
            className="input inputCambiar"
            placeholder="Ingrese su nueva contraseña"
          />
          {errors.newPassword && (
            <p className="error-msj">Nueva contraseña es requerida</p>
          )}
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword", { required: true })}
            className="input inputCambiar"
            placeholder="Confirme su nueva contraseña"
          />
          {errors.confirmPassword && (
            <p className="error-msj">Confirmar contraseña es requerida</p>
          )}
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
