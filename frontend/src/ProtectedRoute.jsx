import { Navigate, Outlet } from "react-router"
import { useAuth } from "./context/authContext"
const ProtectedRoute = () => {
    const {user, isAuthenticated} = useAuth()

    if(!isAuthenticated) return <Navigate to='login' replace />

        return <Outlet/>
}

export default ProtectedRoute