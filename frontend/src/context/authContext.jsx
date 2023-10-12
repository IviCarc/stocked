import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import { set } from "react-hook-form";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado con un AuthProvider')
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errores, setErrors] = useState([])
    
    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true)
        } catch (error) {
            // console.log(error.response)
            setErrors(error.response.data)
        }

    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data);
        } catch (error) {
            if(Array.isArray(error.response.data)){
              return  setErrors(error.response.data)
            }
            setErrors([errores.response.data.message])
        }

    }

    useEffect(() =>{
    if(errores.length>0){
        const timer = setTimeout(()=>{
            setErrors([])
        },5000)
        return () => clearTimeout(timer)
    }
    },[errores])

    useEffect(() =>{
     const cookies = Cookies.get()       
     
     if(cookies.token){
        console.log(cookies)
     }
    },[])

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            errores
        }}>
            {children}
        </AuthContext.Provider>
    )
}