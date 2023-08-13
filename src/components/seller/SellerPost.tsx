import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import useProduct from '../../store/product'
import { Card } from 'react-bootstrap'
import '../../styles/NewPost.css'
import Popup from '../../components/Popup'
import DeletePost from '../../components/seller/DeletePost'
import EditPost from './EditPost'
import ViewPostDetail from './ViewPostDetail'
import { BiTrash, BiEdit } from 'react-icons/bi'


interface Props {
    item: any,
    id: number
}
export default function SellerPost({ item, id }: Props) {
    const [deletePopup, setDeletePopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const [detailPopup, setDetailPopup] = useState(false)
    const [publication, setPublication] = useState([])
    const [entry, setEntry] = useState(false)
    const product:any = useProduct()

    useEffect(() => {
        if (entry && !detailPopup) {
            window.location.reload()
        }
    }, [entry, detailPopup])

    async function editProduct(itemId: number) {
        await setPublication(await product.getPublication(itemId))
        setEditPopup(true)
    }

    async function viewProduct(itemId: number) {
        await setPublication(await product.getPublication(itemId))
        setDetailPopup(true)
    }

    return (
        <>
            <Card key={id}>
                <Card.Body style={{ display: 'flex' }}>
                    {
                        (item.photo_uris.length > 0) ? (
                            <Card.Img style={{maxHeight: "10rem", width: "fit-content", marginRight: "2rem"}} src={item.photo_uris[0]} />
                        ) : null
                    }
                    
                    <div style={{marginLeft: "15px", textAlign: "left"}}>
                        <div style={{display: "flex"}}>
                            <Card.Title>{item.general_item_info.name}</Card.Title>
                            <button className='add-more' onClick={() => viewProduct(item.id)}
                                style={{backgroundColor: "transparent", color: "#bf4b3b", 
                                textDecoration: "underline", border: "none", marginTop: "-2%", 
                                marginLeft: "3%"}}>
                                Ver colores y/o tallas
                            </button>
                        </div>
                        <Card.Text style={{color: "grey"}}>
                            Marca: {item.general_item_info.brand}, Precio: ${item.price}, Categoria: {item.general_item_info.category.name}
                        </Card.Text>
                        
                        <Card.Text >Cantidad disponible: {item.general_item_info.total_amount}</Card.Text>
                        <button onClick={() => editProduct(item.id)} 
                        style={{marginRight: "10px", marginBottom: "10px"}} className="submit-button">
                            <BiEdit style={{marginRight: "8px"}}/> Editar
                        </button>
                        <button onClick={() => setDeletePopup(true)} className="submit-button">
                            <BiTrash style={{marginRight: "8px"}}/> Eliminar
                        </button>
                        
                        <Popup trigger={deletePopup} setTrigger={setDeletePopup}>
                            <DeletePost trigger={editPopup} item={item} setTrigger={setDeletePopup}/>
                        </Popup>
                        <Popup trigger={editPopup} setTrigger={setEditPopup}>
                            <EditPost publication={publication} setTrigger={setEditPopup}/>
                        </Popup>
                        <Popup trigger={detailPopup} setTrigger={setDetailPopup}>
                            <ViewPostDetail setEntry={setEntry} publication={publication} setTrigger={setDetailPopup}/>
                        </Popup>
                    </div>
                </Card.Body>
            </Card>
            <br/>
        </>
    );
}
