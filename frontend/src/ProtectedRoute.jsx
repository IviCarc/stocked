import { Navigate, Outlet } from "react-router"
import { useAuth } from "./context/AuthContext"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Loading = () => {

    MySwal.fire({
        position: 'center',
        showSpinner: true,
        showConfirmButton: false,
        timer: 500,
        title: 'Cargando...',
        onBeforeOpen: () => {
            Swal.showLoading()
        },
    })

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', backgroundColor: '#fff' }} className="loading-div">
        </div>
    )
}

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth()
    if (loading) {
        return <Loading></Loading>
    };

    if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
    return <Outlet />;
}

export default ProtectedRoute