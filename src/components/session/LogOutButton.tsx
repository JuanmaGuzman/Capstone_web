import { Button } from 'primereact/button'
import useAuth from '../../store/auth'
import swal from 'sweetalert'


const LogOutButton = () => {

	const auth:any = useAuth()

	const handleLogOut = async () => {
		await auth.logOut()
		.then(
			swal({
				title: 'Sesión cerrada exitosamente',
				icon: 'info',
				timer: 2000,
			  })
			.then(() => {window.location.href = "/"})
		)
	}

	return (
		<button className='nav-link' style={{backgroundColor: "transparent", border: "none", color: "white"}} onClick={handleLogOut}>Cerrar Sesión</button>
	)

}

export default LogOutButton
