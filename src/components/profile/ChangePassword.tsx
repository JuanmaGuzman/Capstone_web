import { useState } from 'react';
import { useFormik } from 'formik';
import '../../styles/editProfileUser.css';
import useAuth from '../../store/auth'
import { ChangePasswordIn } from '../../lib/api/models/ChangePasswordIn'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import { object, string, number, date, InferType, ref } from 'yup'

export default function ChangePassword(){
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    old_password: "",
    new_password1: "",
    new_password2: ""
  })

  const auth:any = useAuth();

  const navigate = useNavigate();

  const validationSchema = object().shape({
    old_password: string()
                  .required("*La contraseña antigua es requerida")
                  .label('old_password'),
    new_password1: string()
                  .required("*La contraseña nueva es requerida")
                  .min(8, 'La contraseña necesita al menos 8 caracteres')
                  .matches(/[0-9]/, 'La contraseña requiere al menos un numero')
                  .matches(/[a-z]/, 'La contraseña requiere al menos una minuscula')
                  .matches(/[A-Z]/, 'La contraseña requiere al menos una Mayuscula')
                  .matches(/[-_/='?¿¡*{};!@#$%^&*(),.?":{}|<>+]/, 'La contraseña requiere al menos un caracter especial'),
                  
    new_password2: string()
                  .required("*La confirmación de la contraseña nueva es requerida")
                  .oneOf([ref('new_password1'), null], 'Las contraseñas deben coincidir')
  });

  const [formData, setFormData] =useState<ChangePasswordIn|null>(() => {
    return({
        old_password: "",
        new_password1: "",
        new_password2: ""
    })
  })

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const formik = useFormik({
    initialValues: {
        old_password: "",
        new_password1: "",
        new_password2: ""
    },
    validationSchema: validationSchema,
    // validate: (data) => {
    //   let errors: ChangePasswordIn = {} as ChangePasswordIn
    //   if (!data.old_password) {errors.old_password = 'La contraseña antigua es requerido'}
    //   if (!data.new_password1) {errors.new_password1 = 'La contraseña nueva es requerido'}
    //   if (!data.new_password2) {errors.new_password2 = 'Necesita confirmar su nueva contrasea'}
    // },
    onSubmit: async (data) => {
      setFormData(data)
      // console.log(data.email)
        const response = await auth.ChangePasswordProfile(data)
        console.log( typeof response)
        if (response.length === 2) {
            swal("Contraseña cambiada con éxito", "", "success")
			.then(() => {window.location.href = "/profile"})
        }
        else{
            // Errores que vienen del backend
            if (JSON.parse(response).body.errors){
              setErrors(JSON.parse(response).body.errors)
            }
        }
    //   await profile.updateInformationUser(data)
      
    //   await profile.getInformationUser()

    //   if (localStorage.getItem('user')){
    //     navigate ('/profile')
    //   }
      
    //   formik.resetForm()
    }
  })

  const isFormFieldValid = (name: keyof ChangePasswordIn) => {
        return !!(formik.touched[name] && formik.errors[name])
    }
    const getFormErrorMessage = (name: keyof ChangePasswordIn) => {
            return (
                isFormFieldValid(name) && 
                <small className="p-error">{formik.errors[name]}</small>
            )
    }

  return (
      <div>
        <h3 className='editTitle'>Cambia tu contraseña</h3>
        <div id='EditDiv'>
          <div className='dataDiv'>
            <form onSubmit={formik.handleSubmit}>
              <div className='formDiv'>
                <label htmlFor="old_password" className='editLabel'>Contraseña antigua: </label>
                <input
                  type="password"
                  value={formik.values.old_password} 
                  name="old_password" 
                  placeholder='Contraseña antigua'
                  onChange={formik.handleChange}
                  className={formik.touched.old_password && formik.errors.old_password || errors.old_password ? 'errors' : 'editInput'}
                />
                {/* {getFormErrorMessage('old_password')} */}
                {formik.touched.old_password && formik.errors.old_password && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.old_password}
                  </div>
                )}
                {/* Errores del Backend */}
                {errors ? (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {errors.old_password}
                  </div>
                ) : null}
              </div>
              <div className='formDiv'>
                <label htmlFor="new_password1" className='editLabel'>Nueva contraseña: </label>
                <input
                  type="password"
                  value={formik.values.new_password1} 
                  onChange={formik.handleChange}  
                  name="new_password1" 
                  placeholder='Nueva contraseña'
                  className={formik.touched.new_password1 && formik.errors.new_password1 || errors.new_password1 ? 'errors' : 'editInput'}
                />
                {/* {getFormErrorMessage('new_password1')} */}
                {formik.touched.new_password1 && formik.errors.new_password1 && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.new_password1}
                  </div>
                )}
                {/* Errores del Backend */}
                {errors ? (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {errors.new_password1}
                  </div>
                ) : null}
              </div>
              <div className='formDiv'>
                <label htmlFor="new_password2" className='editLabel'>Confirmar contraseña: </label>
                <input
                  type="password"
                  value={formik.values.new_password2} 
                  onChange={formik.handleChange}   
                  name="new_password2" 
                  placeholder='Confirmar contraseña'
                  className={formik.touched.new_password2 && formik.errors.new_password2 || errors.new_password2 ? 'errors' : 'editInput'} 
                />
                {/* {getFormErrorMessage('new_password2')} */}
                {formik.touched.new_password2 && formik.errors.new_password2 && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.new_password2}
                  </div>
                )}
                {/* Errores del Backend */}
                {errors ? (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {errors.new_password2}
                  </div>
                ) : null}
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