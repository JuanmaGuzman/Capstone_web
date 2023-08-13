import '../../styles/NewPost.css'
import swal from 'sweetalert'
import useProduct from '../../store/product'
import { useEffect } from 'react'

interface Props {
    setTrigger: any,
    item: any,
	trigger: boolean
}

const DeletePost = ({ setTrigger, trigger, item }: Props) => {
	const product:any = useProduct()

	useEffect(() => {
		setTimeout(() => window.location.reload(), 3000);
	}, [trigger])

    async function deleteProduct() {
		try {
			await product.removePublication(parseInt(item.id))
			deleteSuccessful()
		}
        catch (err: any) {
			console.log(err)
			deleteFailed()
		}
    }

	const deleteSuccessful = () => {
        setTrigger(false)
		swal({
			title: 'Producto borrado con éxito!',
			icon: 'success'
		  })
	};

	const deleteFailed = () => {
        setTrigger(false)
		swal({
			title: 'Producto no se pudo eliminar, intentelo más tarde.',
			icon: 'error'
		  })
	};


	return (
		<div className="form-demo">
			<div className="login">
				<div className="card">
					<h3 className="text-center">Eliminar publicación</h3>
                    <p style={{marginBottom: "-5px"}}>Esta acción <strong style={{color: "#bf3b4b"}}>NO</strong> se podrá revertir.</p>
					<hr/>
					<p style={{margin: "0px 10% 20px 10%", fontSize: "105%"}}>¿Estás seguro que quieres eliminar la publicación del 
                        producto {item.general_item_info.name}?</p>
                    <button onClick={deleteProduct} className="delete-button">Eliminar</button>

				</div>
			</div>
		</div>
	)
}

export default DeletePost
