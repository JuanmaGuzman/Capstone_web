import '../../styles/userProfile.css'
import { TransactionSchema } from '../../lib/api/models/TransactionSchema'
import { Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

export default function Detail(purchase:TransactionSchema){

    const navigate = useNavigate()
    let totalPurchase:number = 0
    let totalProducts:number = 0
    let totalWithoutDiscount:number = 0
    
    if(purchase?.transaction_pointers){
        totalProducts += purchase?.transaction_pointers?.length
    }
    
    purchase?.transaction_pointers?.forEach(p => {
        if (purchase?.coupon?.discount_percentage) {
            totalPurchase += ((p.price_per_unit * p.amount) - ((p.price_per_unit * p.amount) * (purchase?.coupon?.discount_percentage / 100)))
        }
        else{
            totalPurchase += ((p.price_per_unit * p.amount))
        }
        totalWithoutDiscount += (p.price_per_unit * p.amount)
    })

    // console.log(purchase)  
    // const handleProduct = (productId:number) => {
    //     navigate('/poduct/' + productId)
    // }
    return(
        <div className='container text-center mx-auto'>
            <h2 style={{marginBottom: "10px"}}>Detalle de la compra {purchase.id}</h2>
            <h5 style={{marginBottom: "15px", color:"grey",  fontSize:"110%"}}>{totalProducts} artículos | Total compra: ${totalPurchase}</h5>
            {/* <div className="row"> */}
                {/* <div className="col-12 col-md-8 profileDiv"> */}
            {
                purchase?.transaction_pointers?.map((item:any, key:number) => 
                <div>
                <Card key={key}>
                    <Card.Body style={{ display: 'flex', flex: '1 1 100%' }}>
                        <a href={`/products/${item.publication_item.publication}`}>
                            <Card.Img style={{maxHeight: "13vw", width: "fit-content"}} src={item.publication_item.publication_info.image_uris ? (item.publication_item.publication_info.image_uris[0]): (null)} />
                        </a>
                        <div style={{marginLeft: "15px", textAlign: "left"}}>
                            <div>
                                <Card.Title style={{float: "left"}}>{item.publication_item.item.name}</Card.Title>
                                {(purchase.coupon) ?
                                    <>
                                        <Card.Text style={{float: "right", textDecorationLine: "line-through"}}>${item.price_per_unit}</Card.Text>
                                        <Card.Text style={{marginLeft: "15px", float: "right", fontSize: "18px", color: "red"}}>${item.price_per_unit - (item.price_per_unit * purchase.coupon?.discount_percentage/100)} &nbsp;</Card.Text>
                                    </>
                                    :
                                    <Card.Text style={{marginLeft: "15px", float: "right"}}>${item.price_per_unit}</Card.Text>
                                }
                                
                            </div>
                            <Card.Text style={{marginTop: "35px", fontSize: "90%", color: "grey"}}>
                                Marca: {item.publication_item.item.brand}
                                <br />
                                Talla: {item.publication_item.item.size} {/*, Color: {item.publication_item.item.color} */}
                                <br />
                                Color: {item.publication_item.item.color}
                                <br />
                                SKU: {item.publication_item.item.sku}
                            </Card.Text>
                            <Card.Text style={{marginTop: "10px"}}>Cantidad comprada: {item.amount}</Card.Text>
                            {/* <button style={{marginRight: "10px", marginBottom: "10px"}} className="submit-button">Eliminar publicación</button>
                            <button className="submit-button">Editar publicación</button> */}
                        </div>
                    </Card.Body>
                </Card>
                <br/>
                </div>
                )
            }   
            {/* </div> */}

            {/* <div className="col-6 col-md-4" > */}
            <div className="row">
                <div className="col-6">
                    <h4 style={{color: "#bf3b4b"}}>Datos de Envio</h4>
                    <p>{purchase.shipping_address?.address}</p>
                    <p>{purchase.shipping_address?.commune}, {purchase.shipping_address?.region}</p> 
                </div>
                
                {/* <br /> */}
                <div className="col-6">
                <h4 style={{color: "#bf3b4b"}}>Resumen Compra</h4>
                
                <div className="row">
                    <div className="col" style={{textAlign: "left", paddingLeft: "50px"}}>
                        <h5>{totalProducts} artículos:</h5>
                    </div>
                    <div className="col"></div>
                    <div className="w-100"></div>
                    <div className="col" style={{textAlign: "left", paddingLeft: "50px"}}>
                        Precio Original:
                    </div>
                    <div className="col">
                        {totalWithoutDiscount}
                    </div>
                    <div className="w-100"></div>
                    <div className="col" style={{textAlign: "left", paddingLeft: "50px"}}>
                        Descuentos Aplicados:
                    </div>
                    {(purchase.coupon) ? 
                        <div className="col" style={{color:"#bf3b4b"}}>
                            - {(purchase.coupon?.discount_percentage / 100) * totalWithoutDiscount} 
                        </div>
                        :
                        <div className="col">
                            0 
                        </div>
                    }
                                            
                    {/* </div> */}
                    <div className="w-100"></div>
                    <hr style={{paddingLeft: "50px"}}/>
                    <div className="col" style={{textAlign: "left", paddingLeft: "50px"}}>
                        Total:
                    </div>
                    <div className="col">
                        $ {totalPurchase}
                    </div>
                </div>

                </div>
                
            </div>
        {/* </div> */}
        {/* </div> */}
            

        </div>
    )
}