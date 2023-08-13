import { useState } from 'react';
import { useFormik } from 'formik';
import '../../styles/editProfileUser.css';
import {
	RequestPasswordResetIn
} from '../../lib/api/models/RequestPasswordResetIn'
import { UserAuthService } from '../../lib/api/services/UserAuthService'
import swal from 'sweetalert'

export default function RequestPasswordResetForm(){
	// Set states
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] =useState<RequestPasswordResetIn>({
		email: "",
  })

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const formik = useFormik({
    initialValues: {
			email: ""
    },
    validate: (data) => {
      let errors: RequestPasswordResetIn = {} as RequestPasswordResetIn
      if (!data.email) {errors.email = 'El email es requerido'}
    },
    onSubmit: async (data) => {
      setFormData(data)
			try {
        await UserAuthService.requestPasswordReset(formData)
				swal("Email para reiniciar contraseña enviado.", "", "success")
			} catch (err: any) {
				swal(
					'Error de enviando email para reiniciar contraseña.',
					'',
					'error'
				)
			}
    }
  })

  const isFormFieldValid = (name: keyof RequestPasswordResetIn) => {
		return !!(formik.touched[name] && formik.errors[name])
	}

	const getFormErrorMessage = (name: keyof RequestPasswordResetIn) => {
		return (
			isFormFieldValid(name) && 
			<small className="p-error">{formik.errors[name]}</small>
		)
	}

  return (
		<div className="container text-center mx-auto">
			<h3 className='editTitle'>Restablecer contraseña</h3>
			<p>Ingresa tu correo electrónico para recibir información sobre como crear una nueva contraseña.</p>
			<div id='EditDiv'>
				<div className='dataDiv'>
					<form onSubmit={formik.handleSubmit}>
						<div className='formDiv'>
							
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
							<button type="submit" id='updateProfile'>Enviar email</button>
						</div>
					</form>
				</div>
			</div>
		</div>
  )
}

