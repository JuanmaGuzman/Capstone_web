import { useState } from 'react';
import { useFormik } from 'formik';
import '../../styles/editProfileUser.css';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { SetPasswordIn } from '../../lib/api/models/SetPasswordIn'
import { UserAuthService } from '../../lib/api/services/UserAuthService'
import swal from 'sweetalert'

export default function ResetPasswordForm(){
	// Declare history
	const navigate = useNavigate()
	// Get query params
	const [searchParams, _setSearchParams] = useSearchParams()
	const resetToken = searchParams.get('token')
	// Set states
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] =useState<SetPasswordIn>({
		email: "",
		new_password1: "",
		new_password2: "",
		token: ""
  })

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const formik = useFormik({
    initialValues: {
			email: "",
			new_password1: "",
			new_password2: "",
			token: resetToken ? resetToken : ''
    },
    validate: (data) => {
      let errors: SetPasswordIn = {} as SetPasswordIn
      if (!data.email) {errors.email = 'El email es requerido'}
      if (!data.new_password1) {
				errors.new_password1 = 'La contraseña nueva es requerido'
			}
      if (!data.new_password2) {
				errors.new_password2 = 'Necesita confirmar su nueva contrasea'
			}
    },
    onSubmit: async (data) => {
      setFormData(data)
			try {
        await UserAuthService.resetPassword(formData)
				swal("Contraseña cambiada con exito", "", "success")
				navigate('/')
			} catch (err: any) {
				if (err.status == 422) {
					swal(
						'Error de autentificación',
						'El token entregado no corresponde al usuario.',
						'error'
					)
				} else {
					swal('Error', String(Object.values(err.body.errors)[0]), 'error')
				}
			}
    }
  })

  const isFormFieldValid = (name: keyof SetPasswordIn) => {
		return !!(formik.touched[name] && formik.errors[name])
	}

	const getFormErrorMessage = (name: keyof SetPasswordIn) => {
		return (
			isFormFieldValid(name) && 
			<small className="p-error">{formik.errors[name]}</small>
		)
	}

  return (
		<div>
			<h3 className='editTitle'>Restablecer contraseña</h3>
			<div id='EditDiv'>
				<div className='dataDiv'>
					<form onSubmit={formik.handleSubmit}>
						<div className='formDiv'>
							<label htmlFor="email" className='editLabel'>
								Email: 
							</label>
							<input
								type="email"
								value={formik.values.email} 
								name="email" 
								placeholder='Email'
								onChange={formik.handleChange}
								className='editInput'
							/>
							{getFormErrorMessage('email')}
						</div>
						<div className='formDiv'>
							<label htmlFor="new_password1" className='editLabel'>
								Nueva Contraseña: 
							</label>
							<input
								type="password"
								value={formik.values.new_password1} 
								onChange={formik.handleChange}  
								name="new_password1" 
								placeholder='Nueva Contraseña'
								className='editInput'
							/>
							{getFormErrorMessage('new_password1')}
						</div>
						<div className='formDiv'>
							<label htmlFor="new_password2" className='editLabel'>
								Confirmar Contraseña: 
							</label>
							<input
								type="password"
								value={formik.values.new_password2} 
								onChange={formik.handleChange}   
								name="new_password2" 
								placeholder='Confirmar Contraseña'
								className='editInput' 
							/>
							{getFormErrorMessage('new_password2')}
						</div>
						<div className='formDiv'>
							<button type="submit" id='updateProfile'>Guardar Cambios</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
  )
}
