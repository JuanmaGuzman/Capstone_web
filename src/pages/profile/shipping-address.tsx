// import useProduct from '../../store/product'
// import { useFormik } from 'formik'
// import { InputText } from 'primereact/inputtext'
// import { InputTextarea } from 'primereact/inputtextarea'
// import '../../styles/NewPost.css'
// import swal from 'sweetalert'
import useAuth from '../../store/auth'
import Address from '../../components/profile/AddressList'

const AddAddress = () => {
    // const inputStyle= {backgroundColor: "white", borderRadius: "5px",
	// 					color: "black", border: "0.5px gray solid", width: "80%", 
	// 					marginBottom: "10px", height: "2rem"}
    // const inputStyle2= {backgroundColor: "white", borderRadius: "5px",
	// 					color: "black", border: "0.5px gray solid", width: "50%", 
	// 					marginBottom: "2rem", height: "2rem", marginLeft: "10px"}
    // const product:any = useProduct()
   
	// const updateSuccessful = async () => {
	// 	await swal({
	// 		title: '¡Dirección agregada con éxito!',
	// 		icon: 'success',
	// 		// timer: 2000,
	// 	  })
    //       window.location.reload()
	// };

    // const formik = useFormik({
    //     initialValues: {
    //         region: '',
    //         commune: '',
    //         address: ''
    //     },
    //     onSubmit: async (data) => {
    //         // console.log(data)
    //         // await product.updatePublication(publication.id, data)
    //         formik.resetForm()
    //         updateSuccessful()
                
    //     }
    // })


	// return (
	// 	<div className="container text-center mx-auto">
    //         <h3 style={{paddingTop: "20px", paddingBottom: "15px"}}>Mi libreta de direcciones</h3>
	// 	</div>
	// )
    const auth:any = useAuth()

    if(auth.isLoggedIn()) {
        return (
            <div>
                <Address />
            </div>
        )
    }
    else {
        return(
            <div>
              <h3 style={{marginTop: '70px'}}>Inicia sesión para ver tu información personal</h3>
            </div>
          )
    }
    

}

export default AddAddress
