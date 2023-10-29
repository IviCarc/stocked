import "../css/login.css";
import "../css/inputs.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email("Debe ser un email válido").required("Campo obligatorio")
    .test('is-com', 'Debe terminar en ".com"', (value) => {
      if (value && yup.string().email().isValidSync(value)) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      }
      return true; // No se aplica la validación si el campo está vacío o no es un correo electrónico válido
    }),
    password: yup.string().min(6, "Mínimo 6 caracteres").required()
  })
  .required();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signIn, errores, isAuthenticated } = useAuth();
  const onSubmit = async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      console.log(error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const navigate = useNavigate();

  return (
    <div className="login">
      <h1 className="title">STOCKED</h1>
      <form className="input-register" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email"></label>
        <input
          type="email"
          {...register("email")}
          className="input"
          placeholder="Ingrese su email"
        />
        {errors.email && <p className="input-error-message">{errors.email.message}</p>}
        <label htmlFor="password"></label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="input"
          placeholder="Ingrese su contraseña"
        />
          {errors.password && <p className="input-error-message">{errors.password.message}</p>}
        <div className="password-container">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-btn "
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className="changePassword-container">
          <p>
            <Link
              className="changePasswordLink"
              to="http://localhost:3000/resetPasswordRequest/"
            >
              ¿Olvidó su contraseña?
            </Link>
          </p>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            Ingresar
          </button>
          <Link className="registerLink" to="http://localhost:3000/register/">
            <button className="btn btn-register">Registrarse</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
