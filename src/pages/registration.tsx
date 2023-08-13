import { useState } from 'react';
import { useFormik, validateYupSchema } from 'formik'
import { Link } from 'react-router-dom';
import '../styles/RegistrationForm.css';
import Popup from '../components/Popup'
import Login from '../components/session/Login'
import { useProfile } from '../store/profile';
import { UserProfileCreationSchema } from '../lib/api/index'
import { useNavigate } from "react-router-dom";
import { object, string, date, ref } from 'yup'

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    rut: "",
    birthdate: "",
    password1: "",
    password2: "",
  })

  const profile:any = useProfile();
  const navigate = useNavigate();

  const rutValidator = (RUT:any) => {
    let M = 0
    let S = 0
    for (; RUT; RUT = Math.floor(RUT / 10)) {
      S = (S + RUT % 10 * (9 - M++ %6)) % 11
      
    }

    if (S === 10){
      return 'k'
    }
    else if (S === 11){
      return 0
    }
    else {
      return S
    }
    // return S ? S - 1:'k'
  }

  const validationSchema = object().shape({
    username: string()
             .required("El nombre de usuario es requerido")
             .min(2, 'El nombre de usuario es muy corto')
             .max(150, 'Reuiqre ser de menos de 150 caracteres')
             .matches(/^[a-zA-Z0-9]*$/, 'El nombre de usuario es sin espacio y sin caracteres especiales')
             .label('usenamer'),
    email: string()
          .email('Ingrese un correo valido')
          .required("El correo electronico es requerido"),                  
    first_name: string()
              .min(2, 'el nombre es muy corto'),
    last_name: string()
              .min(2, 'El apellido es muy corto'),
    rut: string()
        .required('El RUT es requerido')
        .matches(/^\d+\.\d{3}\.\d{3}-[\dkK]$/, 'El Rut debe ingresarse con puntos y guión')
        .test('rut-validador', 
               'Debes ingresar un RUT valido', 
               function (value) {
                const {path, createError} = this
                let tmp = value?.split('-')
                if (tmp) {
                  let left = tmp[0].split('.')
                  let num = left.join('')
                  let digv = tmp[1]
                  if(digv == 'K') digv = 'k'
                  const expected = rutValidator(parseInt(num))
                  return (
                    (expected.toString() === digv || 
                      createError({ path, message: 'Debes ingresar un RUT válido'}))
                    )
                }
                return (createError({path, message: ''}))
               }),
    phone_number: string()
                  .max(17, 'El número ingresado es demasiado largo')
                  .required('El número de teléfono es requerido'),
    birthdate: date()
              .required('La fecha de nacimiento es requerida'),
    password1: string()
              .required("La contraseña es requerida")
              .min(8, 'La contraseña necesita al menos 8 caracteres')
              .matches(/[0-9]/, 'La contraseña requiere al menos un numero')
              .matches(/[a-z]/, 'La contraseña requiere al menos una minuscula')
              .matches(/[A-Z]/, 'La contraseña requiere al menos una Mayuscula')
              .matches(/[-_/='?¿¡*{};!@#$%^&*(),.?":{}|<>]/, 'La contraseña requiere al menos un caracter especial'),
    password2: string()
              .required("La confirmación de la contraseña es requerida")
              .oneOf([ref('password1'), null], 'Las contraseñas deben coincidir')
  });

  const [formData, setFormData] =useState<UserProfileCreationSchema>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    rut: "",
    birthdate: "",
    password1: "",
    password2: "",
  })


  if (loading) {
    return <h2>Loading...</h2>;
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      rut: "",
      birthdate: "",
      password1: "",
      password2: ""
    },
    validationSchema: validationSchema,
    // validate: (data) => {
    //   let errors: UserProfileCreationSchema = {} as UserProfileCreationSchema
    //   if (!data.email) {errors.email = 'El Email es requqerido'}
    //   if (!data.password1) {errors.password1 = 'La contraseña es requerida'}
    //   if (!data.password2) {errors.password2 = 'Debe confirmar la contraseña'}
    //   if (!data.username) {errors.username = 'Debe ingresar un nombre de usuario'}
    // },
    onSubmit: async (data) => {
      setFormData(data)
      console.log(data.email)
      // localStorage.removeItem('user')
      // console.log(localStorage.getItem('user'));
      const response = await profile.createNewUser(data)
      // console.log(formData)
      await profile.getInformationUser()

      if (localStorage.getItem('user')){
        navigate('/')
        
      }
      else{
        // console.log(JSON.parse(response).body.errors)
        if (JSON.parse(response).body.errors){
          setErrors(JSON.parse(response).body.errors)
        }
        
      }
      // formik.resetForm()
    }
  })

  // const isFormFieldValid = (name: keyof UserProfileCreationSchema) => {
	// 	return !!(formik.touched[name] && formik.errors[name])
	// }
	// const getFormErrorMessage = (name: keyof UserProfileCreationSchema) => {
	// 		return (
	// 			isFormFieldValid(name) && 
	// 			<small className="p-error">{formik.errors[name]}</small>
	// 		)
	// }

  return (
    
      <div className='container text-center mx-auto'>
        <h2>Crea tu cuenta</h2>
        <p style={{marginBottom: "0px", fontSize: "20px"}}>¡En Nudos Eline queremos conocerte!</p>
        <div>
          <form onSubmit={formik.handleSubmit}>
            
            <div>
              <input
                type="text"
                value={formik.values.first_name} 
                name="first_name" 
                placeholder='Nombre'
                onChange={formik.handleChange}
                className={formik.touched.first_name && formik.errors.first_name || errors.first_name ? 'errors' : 'input-username'}
              />
              {/* Errores de yup */}
              {formik.touched.first_name && formik.errors.first_name && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.first_name}
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
                      {errors.first_name}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input
                type="text"
                value={formik.values.last_name} 
                onChange={formik.handleChange}  
                name="last_name" 
                placeholder='Apellido'
                className={formik.touched.last_name && formik.errors.last_name || errors.last_name ? 'errors' : 'input-username'}
              />
              {/* Errores de yup */}
              {formik.touched.last_name && formik.errors.last_name && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.last_name}
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
                      {errors.last_name}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input 
                type="text"
                value={formik.values.email} 
                onChange={formik.handleChange}
                name="email" 
                placeholder='Correo'
                className={formik.touched.email && formik.errors.email || errors.email ? 'errors' : 'input-username'} 
              />
              {/* Errores de yup */}
              {formik.touched.email && formik.errors.email && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.email}
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
                      {errors.email}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input
                type="text"
                value={formik.values.username} 
                onChange={formik.handleChange}   
                name="username" 
                placeholder='Nombre de usuario'
                className={formik.touched.username && formik.errors.username || errors.username ? 'errors' : 'input-username'} 
              />
              {/* Errores de yup */}
              {formik.touched.username && formik.errors.username && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.username}
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
                      {errors.username}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input
                type="text"
                value={formik.values.rut} 
                onChange={formik.handleChange}   
                name="rut" 
                placeholder='RUT'
                className={formik.touched.rut && formik.errors.rut || errors.rut ? 'errors' : 'input-username'} 
              />
              {/* Errores de yup */}
              {formik.touched.rut && formik.errors.rut && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.rut}
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
                      {errors.rut}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input
                type="text"
                value={formik.values.phone_number} 
                onChange={formik.handleChange}   
                name="phone_number" 
                placeholder='Número de Teléfono'
                className={formik.touched.phone_number && formik.errors.phone_number || errors.phone_number ? 'errors' : 'input-username'} 
              />
              {/* Errores de yup */}
              {formik.touched.phone_number && formik.errors.phone_number && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.phone_number}
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
                      {errors.phone_number}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                value={formik.values.birthdate} 
                onChange={formik.handleChange}   
                name="birthdate" 
                placeholder='Fecha de Nacimiento'
                className={formik.touched.birthdate && formik.errors.birthdate || errors.birthdate ? 'errors' : 'input-username'} 
              />
              {/* Errores de yup */}
              {formik.touched.birthdate && formik.errors.birthdate && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.birthdate}
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
                      {errors.birthdate}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input
                value={formik.values.password1} 
                onChange={formik.handleChange}
                type="password" 
                name="password1" 
                placeholder='Contraseña' 
                className={formik.touched.password1 && formik.errors.password1 || errors.password1 ? 'errors' : 'input-username'}  
              />
              {/* Errores de yup */}
              {formik.touched.password1 && formik.errors.password1 && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.password1}
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
                      {errors.password1}
                  </div>
                ) : null}
            </div>
            
            <div>
              <input 
                value={formik.values.password2} 
                onChange={formik.handleChange}
                type="password"
                name="password2" 
                placeholder='Confirmar Contraseña'
                className={formik.touched.password2 && formik.errors.password2 || errors.password2 ? 'errors' : 'input-username'}
              />
              {/* Errores de yup */}
              {formik.touched.password2 && formik.errors.password2 && (
                  <div style={{
                    color:'#FF6565', 
                    // padding:'.5em .2em', 
                    height:'1em', 
                    // position:'absolute', 
                    fontSize:'.8em'}}>
                      {formik.errors.password2}
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
                      {errors.password2}
                  </div>
                ) : null}
            </div>
            
            <div>
              <button type="submit" id='create-profile'>Crear Cuenta</button>
            </div>
          </form>
        </div>
        
        <p id='LogInReg'>¿Ya estás registrado? Inicia sesión 
          <Link to="/registration" onClick={() => setButtonPopup(true)} style={{fontWeight: "bold", color: "#bf3b4b",  marginLeft: "4px"}}>aquí</Link> 
        </p>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Login setTrigger={setButtonPopup}/>
        </Popup>
      </div>

  )
}

export default Registration;