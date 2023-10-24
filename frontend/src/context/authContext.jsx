import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado con un AuthProvider')
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errores, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);


  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      // console.log(res.data); 
      setUser(res.data);
      setIsAuthenticated(true)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registrado correctamente',
        showConfirmButton: false,
        timer: 1000
      })
    } catch (error) {
      console.log(error.response)
      setErrors(error.response.data)
      Swal.fire({
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
        title: 'Error al registrarse'
      })
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response.data.message == "Usuario no encontrado") {
        Swal.fire({
          position: 'center',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000,
          title: 'Usuario no encontrado'
        })
      }
      else if (error.response.data.message == "Contraseña incorrecta") {
        Swal.fire({
          position: 'center',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000,
          title: 'Contraseña incorrecta'
        })
      }
      if (Array.isArray(error.response.data)) {
        console.log(error)
        setErrors(error.response.data)

      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        // console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (errores.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [errores]);


  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        logout,
        isAuthenticated,
        errores,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext