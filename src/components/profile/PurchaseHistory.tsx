import { useEffect, useState } from "react";
import '../../styles/userProfile.css'
// import DetailPage from '../../pages/profile/detalleCompra'
// import { UserProfile } from "../../lib/api/index";
import useAuth from '../../store/auth'
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../store/profile";
import { BiUser, BiLock, BiHistory, BiLogOut, BiMapAlt } from 'react-icons/bi';
import { useTransactions } from "../../store/history";

// const purchases = [
//     {
//         id: 0,
//         shipping_address: {
//             id: 0,
//             user: 0,
//             region: "Metropolitana",
//             commune: "San Miguel",
//             address: "Teresa Vial 1170, Depto. 408"
//         },
//         transaction_pointers: [
//             {
//                 id: 1,
//                 amount: 2,
//                 price_per_unit: 1,
//                 publication_item: {
//                     id: 1,
//                     publication: 1,
//                     item: {
//                         id: 0,
//                         name: "item_0",
//                         brand: "brand_0",
//                         size: "size_0",
//                         color: "color_0",
//                         sku: 10,
//                         category: {
//                         id: 0,
//                         name: "Polera"
//                         }
//                     },
//                     // photo_uris: [
//                     // "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385",
//                     // "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385"
//                     // ]
//                     available: 10,
//                     publication_info: {
//                         price: 1,
//                         image_uris:[
//                             "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385",
//                             "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385"
//                             ]
//                     }
//                 }
//             },
//             {
//                 id: 2,
//                 amount: 3,
//                 price_per_unit: 1,
//                 publication_item: {
//                     id: 3,
//                     publication: 2,
//                     item: {
//                         id: 2,
//                         name: "item_2",
//                         brand: "brand_2",
//                         size: "size_2",
//                         color: "color_2",
//                         sku: 10,
//                         category: {
//                         id: 0,
//                         name: "Polera"
//                         }
//                     },
//                     // photo_uris: [
//                     // "https://img.ltwebstatic.com/images3_pi/2020/12/09/160752896132fce85de9886ab1702e8b6049cc6ccc_thumbnail_600x.webp"
//                     // ],
//                     available: 10,
//                     publication_info: {
//                         price: 1,
//                         image_uris:[
//                             "https://img.ltwebstatic.com/images3_pi/2020/12/09/160752896132fce85de9886ab1702e8b6049cc6ccc_thumbnail_600x.webp"
//                             ]
//                     }
//                 }
//             }
//         ],
//         coupon: {
//           id: 0,
//           code: "string0",
//           discount_percentage: 10
//         }
//     },
//     {
//         id: 1,
//         shipping_address: {
//             id: 0,
//             user: 0,
//             region: "Metropolitana",
//             commune: "San Miguel",
//             address: "Teresa Vial 1170, Depto. 408"
//         },
//         transaction_pointers: [
//             {
//                 id: 1,
//                 amount: 5,
//                 price_per_unit: 1,
//                 publication_item: {
//                     id: 1,
//                     publication: 1,
//                     item: {
//                         id: 0,
//                         name: "item_0",
//                         brand: "brand_0",
//                         size: "size_0",
//                         color: "color_0",
//                         sku: 10,
//                         category: {
//                         id: 0,
//                         name: "Polera"
//                         }
//                     },
//                     // photo_uris: [
//                     // "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385",
//                     // "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385"
//                     // ],
//                     available: 10,
//                     publication_info: {
//                         price: 1,
//                         image_uris:[
//                             "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385",
//                             "http://cdn.shopify.com/s/files/1/0014/1256/3005/products/1_cc10de4b-9388-454c-8ec2-6bbaf957541b.jpg?v=1634657385"
//                             ]
//                     }
//                 }
//             }
//         ]
//     }
//   ]

export default function Purchase(){
    
    const totalPurchase:Array<number> = []
    const navigate = useNavigate()
	const auth:any = useAuth()
    // const profile:any = useProfile()
    const transactions:any = useTransactions()

	const handleLogOut = async () => {
		await auth.logOut()
		navigate ('/')
	}

    const handlePassword = async () => {
        navigate('/profile/contrasena')
    }

    const handleProfile = async () => {
        navigate('/profile')
    }

    const handleAddress = async () => {
        navigate('/profile/shipping-address')
    }

    const [purchases, setPurchases] = useState<any[]>([])

    const sentInformation = (info:any) => {
        // setPurchase(info)
        navigate('/profile/detalleCompra', {state: {info}})
    }
    
    useEffect(() => {
        transactions.getPurchasesBuyer()
                    .then((k:string) => setPurchases(JSON.parse(k)))
    }, [])

    if (purchases.length > 0){
        console.log(typeof purchases)
        purchases.forEach(purchase => {
            let value = 0
            for (let i = 0; i < purchase.transaction_pointers.length; i++){
                value += (purchase.transaction_pointers[i].price_per_unit * purchase.transaction_pointers[i].amount)
                // console.log(purchase.transaction_pointers[i].price_per_unit)
                // console.log(purchase.transaction_pointers[i].amount)
                // console.log(purchase.transaction_pointers[i].price_per_unit * purchase.transaction_pointers[i].amount)
            }
            // console.log(value)
            // purchase.forEach(transaction => value += (transaction.publication.price_per_unit * transaction.publication.amount))
            if (purchase.coupon){
                const valueDiscount = value - ((purchase.coupon.discount_percentage/100) * value)
                totalPurchase.push(valueDiscount)
            }
            else {
                totalPurchase.push(value)
            }
            
        })
    
        console.log(totalPurchase)
    }
    
    return(
        <div>
            <div className="container text-center mx-auto">
                <h2 className='profile-title'>Historial de Compras</h2>
                <div className="row">
                    <div className="col-6 col-md-4" >
                        <div className="d-grid gap-4 col-6 mx-auto">
                            <button className="web-view-button" type="button" onClick={handleProfile}><BiUser style={{fontSize: "200%", marginRight: "5px"}}/>Datos personales</button>
                            <button className="web-view-button" type="button"onClick={handleAddress}><BiMapAlt style={{fontSize: "200%", marginRight: "5px"}}/>Mi libreta de direcciones</button>
                            <button className="web-view-button" type="button" onClick={handlePassword}><BiLock style={{fontSize: "200%", marginRight: "5px"}}/> Cambiar mi contraseña</button>
                            <button className="web-view-button" id='using' type="button"><BiHistory style={{fontSize: "200%", marginRight: "5px"}}/> Mi historial de compras</button>
                            <button className="web-view-button" type="button" onClick={handleLogOut}> <BiLogOut style={{fontSize: "200%", marginRight: "5px"}}/> Cerrar sesión</button>
                        </div>
                    </div>
                    {(purchases.length > 0) ? 
                        <div className="col-12 col-md-8 profileDiv">
                            {
                                purchases.map((buy:any, index:number) =>
                                <>
                                    {/* {total = 0} */}
                                    <div className="card profileDiv">
                                        <div className="card-body">
                                            <div>
                                                <p className="profileField"> <strong style={{color: "#Bf3b4b"}}>Numero de Pedido:</strong> {buy.id}</p>
                                                {/* <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Fecha de Compra:</strong> 19-11-2022</p> */}
                                                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Total de Articulos:</strong> {buy.transaction_pointers.length}</p>
                                                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Total Compra: </strong> ${totalPurchase[index]}</p>
                                                

                                                
                                            </div>
                                            <div id='centrate-mierda'>
                                                {/* <a href="/profile/detalleCompra" className="edit-profile">Detalle de la Compra</a> */}
                                                <button className="edit-profile" onClick={() => sentInformation(buy)}> Detalle de la Compra</button>
                                            </div>
                                            {/* <a href="/profile/contrasena" className="btn float-end">Cambiar Contraseña</a> */}
                                        </div>
                                    </div>
                                    <br />
                                </>,

                                )
                            }
                        </div> : 
                        <div className="col-12 col-md-8 profileDiv" style={{color: "#Bf3b4b",textAlign:"center"}}>
                            {/* <p className="profileField"> <strong style={{color: "#Bf3b4b", textAlign:"center"}}>Aun no tienes pedidos</strong></p> */}
                            <h6 style={{fontSize: "160%"}}>Aún no tienes pedidos</h6>
                        </div>}
                </div>
                
                <div className="container text-center">
                    <button className="btn mobile-view-button" type="button" onClick={handleProfile}>
                        <BiUser style={{fontSize: "180%", marginRight: "10%"}}/>
                    </button>
                    <button className="btn mobile-view-button" type="button" onClick={handleAddress}>
                        <BiMapAlt style={{fontSize: "180%", marginRight: "10%"}}/>
                    </button>
                    <button className="btn mobile-view-button" type="button" onClick={handlePassword}>
                        <BiLock style={{fontSize: "180%", marginRight: "10%"}}/>
                    </button>
                    <button className="btn mobile-view-button" id='using' type="button">
                        <BiHistory style={{fontSize: "180%", marginRight: "10%"}}/>
                    </button>
                    <button className="btn mobile-view-button" type="button" onClick={handleLogOut}> 
                        <BiLogOut style={{fontSize: "180%", marginRight: "10%"}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}