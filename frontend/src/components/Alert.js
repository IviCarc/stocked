import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Alert = (icon, title) => {
  MySwal.fire({
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500
  })
}

export default Alert