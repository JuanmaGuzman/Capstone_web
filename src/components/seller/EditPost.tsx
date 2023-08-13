import '../../styles/NewPost.css'
import useProduct from '../../store/product'
import { useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import '../../styles/NewPost.css'
import swal from 'sweetalert'

interface Props {
    setTrigger: any,
    publication: any
}

const EditPost = ({ setTrigger, publication }: Props) => {
    const inputStyle= {backgroundColor: "white", borderRadius: "5px",
						color: "black", border: "0.5px gray solid", width: "80%", 
						marginBottom: "10px", height: "2rem"}
    const inputStyle2= {backgroundColor: "white", borderRadius: "5px",
						color: "black", border: "0.5px gray solid", width: "50%", 
						marginBottom: "2rem", height: "2rem", marginLeft: "10px"}
    const product:any = useProduct()
   
	const updateSuccessful = async () => {
        setTrigger(false)
		await swal({
			title: '¡Producto actualizado con éxito!',
			icon: 'success',
			// timer: 2000,
		  })
          window.location.reload()
	};

    const formik = useFormik({
        initialValues: {
            price: publication.price,
            description: publication.description
        },
        onSubmit: async (data) => {
            // console.log(data)
            const response = await product.updatePublication(publication.id, data)
            formik.resetForm()
            updateSuccessful()
                
        }
    })


	return (
		<div className="form-demo">
			<div className="login">
                <h3 style={{paddingTop: "20px", paddingBottom: "15px"}}>Editar publicación</h3>
            <form onSubmit={formik.handleSubmit} className="p-fluid" style={{color: "black"}}>
                <div className="field" >
                    <span className="p-float-label" style={{textAlign: "left"}}>
                        Precio
                        <br/>
                        <InputText
                            style={inputStyle}
                            type="number"
                            id="price"
                            name="price"
                            min={0}
                            placeholder="Precio"
                            value={formik.values.price}
                            onChange={formik.handleChange}  
                        />
                    </span>
                </div>
                <div className="field" >
                    <span className="p-float-label" >
                        Descripción
                        <br/>
                        <InputTextarea rows={5} cols={30}
                            style={inputStyle}
                            autoResize 
                            id="description"
                            name="description"
                            placeholder="Descripción"
                            value={formik.values.description}
                            onChange={formik.handleChange}  
                        />
                    </span>
                   
                </div>
                <button className='delete-button' type="submit">Guardar</button>
            </form>
			</div>
		</div>
	)
}

export default EditPost
