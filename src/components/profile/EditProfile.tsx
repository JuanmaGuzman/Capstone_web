import { useState } from 'react';
import { useFormik } from 'formik'
import { Link } from 'react-router-dom';
import '../../styles/editProfileUser.css';
import { useProfile } from '../../store/profile';
import { UserUpdate } from '../../lib/api/index'
import { useNavigate } from "react-router-dom";

export default function EditProfile(){
  
  const [loading, setLoading] = useState(false);

  const profile:any = useProfile();

  const navigate = useNavigate();

  const [formData, setFormData] =useState<UserUpdate|null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null && storedUser !== undefined){
      const jsonstored = JSON.parse(storedUser);
      // console.log(jsonstored.username)
      return({
        username: jsonstored.username,
        email: jsonstored.email,
        first_name: jsonstored.first_name,
        last_name: jsonstored.last_name
      })
    }
    return({
      username: "",
      email: "",
      first_name: "",
      last_name: ""
    })
  })

  // console.log(formData)

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const formik = useFormik({
    initialValues: {
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      username: formData?.username,
      email: formData?.email,
    },
    validate: (data) => {
      let errors: UserUpdate = {} as UserUpdate
      if (!data.email) {errors.email = 'El Email es requerido'}
    },
    onSubmit: async (data:any) => {
      setFormData(data)
      // console.log(data.email)
      await profile.updateInformationUser(data)
      
      await profile.getInformationUser()

      if (localStorage.getItem('user')){
        navigate ('/profile')
      }
      
      formik.resetForm()
    }
  })

  const isFormFieldValid = (name: keyof UserUpdate) => {
        return !!(formik.touched[name] && formik.errors[name])
    }
    const getFormErrorMessage = (name: keyof UserUpdate) => {
            return (
                isFormFieldValid(name) && 
                <small className="p-error">{formik.errors[name]}</small>
            )
    }

  return (
      <div>
        <h1 className='editTitle'> Edita tus datos</h1>
        <div className="container text-center testimonial-group mx-auto">
          <div className='dataDiv'>
            <form onSubmit={formik.handleSubmit}>
              <div className='formDiv'>
                <label htmlFor="first_name" className='editLabel'>Nombre: </label>
                <input
                  type="text"
                  value={formik.values.first_name} 
                  name="first_name" 
                  placeholder='Nombre'
                  onChange={formik.handleChange}
                  className='editInput'
                />
                {getFormErrorMessage('first_name')}
              </div>
              <div className='formDiv'>
                <label htmlFor="last_name" className='editLabel'>Apellido: </label>
                <input
                  type="text"
                  value={formik.values.last_name} 
                  onChange={formik.handleChange}  
                  name="last_name" 
                  placeholder='Apellido'
                  className='editInput'
                />
                {getFormErrorMessage('last_name')}
              </div>
              <div className='formDiv'>
                <label htmlFor="username" className='editLabel'>Nombre de Usuario: </label>
                <input
                  type="text"
                  value={formik.values.username} 
                  onChange={formik.handleChange}   
                  name="username" 
                  placeholder='Nombre de Usuario'
                  className='editInput' 
                />
                {getFormErrorMessage('username')}
              </div>
              <div className='formDiv'>
                <label htmlFor="email" className='editLabel'>Correo: </label>
                <input 
                  type="text"
                  value={formik.values.email} 
                  onChange={formik.handleChange}
                  name="email" 
                  placeholder='Correo'
                  className='editInput' 
                />
                {getFormErrorMessage('email')}
              </div>
              <button type="submit" id='updateProfile'>Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
      
  )
}