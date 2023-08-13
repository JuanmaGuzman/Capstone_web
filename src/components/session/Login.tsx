import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { LoginIn } from '../../lib/api/models/LoginIn'
import useAuth from '../../store/auth'
import { Link } from 'react-router-dom';
import '../../styles/Login.css'
import swal from 'sweetalert'


const Login = (props: any) => {
	const auth:any = useAuth()
	const inputStyle= {backgroundColor: "white", borderRadius: "5px",
						color: "black", border: "0.5px gray solid", width: "80%", 
						marginBottom: "10px", height: "2rem"}
	const [formData, setFormData] = useState<LoginIn>({
		email: '',
		password: '',
	});

	const loginFailed = () => {
        swal("Datos incorrectos", "Intenta nuevamente", "warning");
      };

	const loginSuccessful = () => {
		props.setTrigger(false)
		swal({
			title: 'Ingreso Exitoso!',
			icon: 'success',
			timer: 2000,
		  })
	};

	const formik = useFormik({
			initialValues: {
					email: '',
					password: '',
			},
			validate: (data) => {
					let errors: LoginIn = {} as LoginIn
					if (!data.email) { errors.email = 'Email is required.' }
					if (!data.password) { errors.password = 'Password is required.' }
					return errors;
			},
			onSubmit: async (data) => {
					setFormData(data)
					await auth.logIn(data)
					.then((value: Response) => {
						if (localStorage.getItem('user')){
							loginSuccessful()
						} else {
							loginFailed()
						}
					})
					formik.resetForm()
					
			}
	})

	const isFormFieldValid = (name: keyof LoginIn) => {
		return !!(formik.touched[name] && formik.errors[name])
	}
	const getFormErrorMessage = (name: keyof LoginIn) => {
			return (
				isFormFieldValid(name) && 
				<small className="p-error">{formik.errors[name]}</small>
			)
	}

	return (
		<div className="form-demo">
			<div className="login">
				<div className="card">
					<h3 className="text-center">¡Bienvenido de vuelta!</h3>
					<hr/>
					<form onSubmit={formik.handleSubmit} className="p-fluid" style={{color: "black"}}>
						<div className="field" >
							<span className="p-float-label" >
								<InputText
									style={inputStyle}
									type="text"
									id="email"
									name="email"
									placeholder="Correo electrónico"
									value={formik.values.email}
									onChange={formik.handleChange}
									autoFocus className={
										classNames({ 'p-invalid': isFormFieldValid('email') })
									}
								/>
							</span>
							{getFormErrorMessage('email')}
						</div>
						<div className="field">
							<span className="p-float-label">
								<Password
									
									id="password"
									name="password"
									placeholder="Contraseña"
									value={formik.values.password}
									onChange={formik.handleChange}
									toggleMask={true}
									className={
										classNames({ 'p-invalid': isFormFieldValid('password') })
									}
									feedback={false}
								/>
							</span>
							{getFormErrorMessage('password')}
						</div>
						<div className='upper-link'>
							¿Has olvidado tu contraseña? Haz click 
							<Link
							to="/profile/request-password-reset"
							style={{color: "#bf3b4b", marginLeft: "4px", fontWeight: "bold"}}
							onClick={() => props.setTrigger(false)}
							>
								 aquí
							</Link>
						</div>
						<button className='displayed' type="submit">Iniciar sesión</button>
						{/* <Button type="submit"  label="Iniciar Sesión" className="login-button" /> */}
						<div className='bottom-link'>
							¿Aún no tienes una cuenta?
							<Link to="/registration" onClick={() => props.setTrigger(false)} style={{color: "#bf3b4b", marginLeft: "4px", fontWeight: "bold"}}>
							Regístrate
							</Link>
						</div>
					</form>

				</div>
			</div>
		</div>
	)
}

export default Login
