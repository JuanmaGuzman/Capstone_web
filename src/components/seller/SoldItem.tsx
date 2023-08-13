import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import { IoPricetagOutline } from 'react-icons/io5'
import { BsPerson } from 'react-icons/bs'
import { TbDiscount2 } from 'react-icons/tb'
import { FiMapPin } from 'react-icons/fi'
import './../../styles/SoldProducts.css'

interface Props {
    item: any,
    id: number, 
    type: string
}
export default function SoldItem({ item, id, type }: Props) {

    return (
        <>
            <Card key={id}>
                <Card.Body>
                <div style={{marginLeft: "15px", textAlign: "left"}}>
                    <div style={{display: "flex", marginBottom: "15px"}}>
                        <Card.Title>{item.publication_item.item.name}</Card.Title>
                    
                    <Card.Text style={{color: "grey", marginLeft: "15px", marginTop: "1px"}}>
                       SKU: {item.publication_item.item.sku}, Marca: {item.publication_item.item.brand}, Categoria: {item.publication_item.item.category.name}
                    </Card.Text>
                    </div>
                    <Card.Text>
                        <IoPricetagOutline style={{marginRight: "5px", color: "#bf4b3b", fontSize: "120%"}}/>
                        <strong style={{color: "#bf4b3b"}}>
                            Compra:</strong> {item.amount} unidades a ${item.price_per_unit} cada uno
                    </Card.Text>
                    <Card.Text>
                        <BsPerson style={{color: "#bf4b3b", fontSize: "120%"}}/>
                        <strong style={{color: "#bf4b3b", marginRight: "5px"}}> Comprador:</strong> 
                        {
                            (type === 'accountless') ? (
                                <>
                                {item.transaction.buyer_name} {item.transaction.buyer_lastname} (información de contacto {item.transaction.phone_number})</>
                            ) : (
                                <>
                                {item.transaction.buyer.first_name} {item.transaction.buyer.last_name} (información de contacto {item.transaction.buyer.email})</>
                            )
                        }
                        
                    </Card.Text>
                    {
                        (item.transaction.coupon != null) ? (
                            <Card.Text>
                                <TbDiscount2 style={{marginRight: "5px", color: "#bf4b3b", fontSize: "120%"}}/>
                                <strong style={{color: "#bf4b3b"}}>
                                    Descuento:</strong> cupón {item.transaction.coupon.code} con descuento asociado del {item.transaction.coupon.discount_percentage}%       
                            </Card.Text>
                        ) : null
                    }
                    <Card.Text>
                        <FiMapPin style={{color: "#bf4b3b", fontSize: "120%"}}/>
                        <strong style={{color: "#bf4b3b", marginRight: "5px"}}> Envío:</strong> 
                        {
                            (type === 'accountless') ? (
                                <>
                                {item.transaction.address}, {item.transaction.commune} ({item.transaction.region})</>
                            ) : (
                                <>
                                {item.transaction.shipping_address.address}, {item.transaction.shipping_address.commune} ({item.transaction.shipping_address.region})</>
                            )
                        }
                        
                    </Card.Text>
                </div>
                </Card.Body>
            </Card>
            <br/>
        </>
    );
}
