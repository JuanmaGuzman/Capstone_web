import '../../styles/NewPost.css'
import useProduct from '../../store/product'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
import '../../styles/NewPost.css'
import swal from 'sweetalert'
import ItemForm from './ItemForm'

interface Props {
    setTrigger: any,
    publication: any,
    setEntry: any
}

const ViewPostDetail = ({ publication, setEntry }: Props) => {
    const inputStyle2= {backgroundColor: "white", borderRadius: "5px",
						color: "black", border: "0.5px gray solid", width: "25%", 
						marginBottom: "2rem", height: "2rem", marginLeft: "10px"}
    const product:any = useProduct()
    const [show, setShow] = useState(false)
    setEntry(true)
    
	const updateSuccessful = async () => {
		await swal({
			title: '¡Producto actualizado con éxito!',
			icon: 'success',
		  })
	};

    const updateFailed = async () => {
		await swal({
			title: 'No se pudo actualizar, intentelo más tarde',
			icon: 'error',
		  })
	};


    const formik = useFormik({
        initialValues: {
            publication_items: publication.publication_items
        },
        onSubmit: async (data) => {
            try {
                for (let i = 0; i < data.publication_items.length; i++){
                    await product.updatePublicationItem(data.publication_items[i].id, {amount: data.publication_items[i].available})
                }
                updateSuccessful()
            }
            catch {
                updateFailed()
            }

                
        }
    })


	return (
		<div>
			<div className="login">
                <h3 style={{paddingTop: "20px", paddingBottom: "15px"}}>Tallas y colores de {publication.publication_items[0].item.name}</h3>
            <div style={{height:"35vh", overflowY:"auto"}}>
            {
                publication.publication_items.map((item:any, key:number) =>
                    <div key={key}>
                        <p>Producto con SKU {item.item.sku} (talla {item.item.size}, color {item.item.color})</p>
                        <form onSubmit={formik.handleSubmit} className="p-fluid" style={{color: "black", marginBottom: "-20px"}}>
                        Cantidad
                        <InputText
                                style={inputStyle2}
                                type="number"
                                id="publication_items.available"
                                name="publication_items.available"
                                min={0}
                                placeholder="Cantidad"
                                defaultValue={formik.values.publication_items[key].available}
                                onChange={(event:any) => {formik.values.publication_items[key].available = parseInt(event?.target.value);}}
                            />
                            <button className='edit-button' type="submit">Cambiar</button>
                        </form>
                        <hr/>
                    </div>
                )   
            }
            </div>
            <br/>
            {
                (!show) ? (
                    <p>¿Quieres agregar una nueva talla y/o color? Haz click 
                        <button onClick={() => setShow(true)} style={{backgroundColor: "transparent", border: "none", color: "#bf4b3b", textDecoration: "underline", fontWeight: "bold"}}>
                            aquí
                        </button>
                    </p>
                ) : (<ItemForm id={publication.id} list={{size: "", color: "", sku: "", amount: ""}} add={true}/>)
            }
            <br/>
            
			</div>
		</div>
	)
}

export default ViewPostDetail;
