import { Navigate, Outlet } from "react-router"
import { useAuth } from "./context/AuthContext"
const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useAuth()
    if (loading) {
        return
    };

    if (!isAuthenticated && !loading) {
        return <Navigate to="/login" replace />;
    } 

    return <Outlet />;
}

export default ProtectedRoute