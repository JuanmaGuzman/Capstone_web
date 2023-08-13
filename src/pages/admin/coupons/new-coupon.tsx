import { useEffect, useState, useMemo } from 'react'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from "react-router-dom"
import { useTransactions }  from '../../../store/history'
import '../../../styles/NewPost.css'
import swal from 'sweetalert';
import Loading from '../../../components/loading/Loading'
import InputProduct from '../../../components/seller/InputProduct'


const NewCoupon = () => {
    const navigate = useNavigate()
    const transaction:any = useTransactions()
    const [formAmount, setFormAmount] = useState(0)
    const location = useLocation()
    let initial = location.state as any;

    useEffect(() => {
      if (initial != null){
        formik.values.name = initial.name
        formik.values.code = initial.code
        formik.values.discount_percentage = initial.discount_percentage
      }
    }, [])

    const conflictAlert = () => {
        swal({
            title: 'El cupón que estás intentando crear posee un código ya utilizado por otro cupón.',
            icon: 'warning',
            buttons: {
              cancel: {
                text: "Ver todos los cupones",
                visible: true,
                value: 'cancel'
              },
              confirm: {
                text: "Cambiar código",
                visible: true,
                value: 'confirm'
              }
            }
            
          })
          .then((value) => {
            switch (value) {
              case "cancel":
                navigate('/admin/coupons/all')
                break
           
              case "confirm":
                break
            }
          });
    }

    const goodAlert = () => {
        swal({
            title: 'El cupón se ha creado con éxito!',
            icon: 'success',
            buttons: {
              cancel: {
                text: "Ver todos los cupones",
                visible: true,
                value: 'cancel'
              },
              confirm: {
                text: "Crear otro cupón",
                visible: true,
                value: 'confirm'
              }
            }
          })
          .then((value) => {
            switch (value) {
              case "cancel":
                navigate('/admin/coupons/all')
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
      code: "",
      discount_percentage: "",
    },
    onSubmit: async (data) => {
      try {
            await transaction.createCoupon(data)
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
          <h2>Crea un cupón</h2>
          <p>Para crear un cupón, llena los datos a continuación.
              <br/>              
          </p>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <InputProduct type='text' value={formik.values.name} handleChange={formik.handleChange} 
                name="name" placeholder='Nombre' min={-1} max={-1}/>
              <InputProduct type='text' value={formik.values.code} handleChange={formik.handleChange} 
                name="code" placeholder='Código' min={-1} max={-1}/>
              <InputProduct type='number' value={formik.values.discount_percentage} handleChange={formik.handleChange} 
                name="discount_percentage" placeholder='Porcentaje de descuento' min={0} max={100}/>
              
              <div style={{marginTop: "25px"}}>
                <button type="submit" className='submit-button'>Crear cupón</button>
              </div>
            </form>
          </div>
        </div>
      }
  </> 

  )
}

export default NewCoupon;