import { useEffect, useState, useMemo } from 'react'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from "react-router-dom"
import useProduct  from '../../store/product'
import '../../styles/NewPost.css'
import swal from 'sweetalert';
import Loading from '../../components/loading/Loading'
import InputProduct from '../../components/seller/InputProduct'


const NewCoupon = () => {
    const navigate = useNavigate()
    const product:any = useProduct()
    const [formAmount, setFormAmount] = useState(0)
    const location = useLocation()
    const [photo, setPhoto] = useState('')
    let initial = location.state as any;


    useEffect(() => {
      if (initial != null){
        formik.values.name = initial.name
        //formik.values.file = initial.file
      }
    }, [])

    const conflictAlert = () => {
        swal({
            title: 'La categoría contiene datos inválidos, intenta de nuevo',
            icon: 'warning',
          })
    }

    const goodAlert = () => {
        swal({
            title: 'La categoría se ha creado con éxito!',
            icon: 'success',
            buttons: {
              cancel: {
                text: "Ver catálogo",
                visible: true,
                value: 'cancel'
              },
              confirm: {
                text: "Crear otra categoría",
                visible: true,
                value: 'confirm'
              }
            }
            
          })
          .then((value) => {
            switch (value) {
              case "cancel":
                navigate('/catalog/all')
                break
           
              case "confirm":
                navigate(0)
                break
            }
          });
    }

    const formik = useFormik({
    initialValues: {
      name: "",
      //discount_percentage: "",
    },
    onSubmit: async (data) => {
      try {
            await product.createCategory(photo, data)
            goodAlert() 
          } catch (err: any) {
            if (err.status === 400)
            {
              conflictAlert()
            }
          }
    }
  })

  return (
    <>
      {
          <div className='container text-center mx-auto'>
          <h2>Crear una categoría</h2>
          <p>Para crear una categoría, llena los datos a continuación.
              <br/>              
          </p>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <InputProduct type='text' value={formik.values.name} handleChange={formik.handleChange} 
                name="name" placeholder='Nombre' min={-1} max={-1}/>
              
              <input 
              onChange={(event:any) => {setPhoto(event.target.file)}}
              type="file"
              name="varies.photo" 
              placeholder='Foto'
              className='file-field'
              required/>
              
              <div style={{marginTop: "25px"}}>
                <button type="submit" className='submit-button'>Crear categoría</button>
              </div>
            </form>
          </div>
        </div>
      }
  </> 

  )
}

export default NewCoupon;