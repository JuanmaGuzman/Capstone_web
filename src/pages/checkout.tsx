import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react"
import './landing.css'
import ShoppingSummary from "../components/shopping-cart/ShoppingSummary"
import { Card } from 'react-bootstrap'
import { useTransactions } from '../store/history'
import useAuth from '../store/auth'
import useCart from '../store/cart'
import AccountlessData from '../components/checkout/AccountlessData'
import ShippingOptions from '../components/checkout/ShippingOptions'
import swal from 'sweetalert'
import useScript from 'react-script-hook'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import { ShoppingCartDetail } from '../lib/api/models/ShoppingCartDetail'

declare global {
  interface Window {
    Fintoc: any;
  }
}

export default function Checkout() {
    function useFintoc() {
        const [loading, error] = useScript({ src: 'https://js.fintoc.com/v1/' })
        return [window.Fintoc || null, loading, error];
      }

    const [Fintoc, loading, error] = useFintoc()
    const transaction:any = useTransactions()
    const auth:any = useAuth()
    const cart:any = useCart()
    const [posts, setPosts] = useState([])
    const [viewLoading, setViewLoading] = useState(true);
    const [authentication, setAuthentication] = useState()
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [mail, setMail] = useState('')
    const [address, setAddress] = useState('')
    const [region, setRegion] = useState('')

    const navigate:any = useNavigate()
    const [cuponError, setCuponError] = useState({
        message: ''
    })
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart !== null) {
            setPosts(JSON.parse(storedCart))
            getAuthentication()
            setViewLoading(false)
        }   
    }, [viewLoading])

    const getAuthentication = async () => {
        setAuthentication(await auth.isLoggedIn())
    };
    
    const payment = async (shipping: number) => {
        if (shipping !== null) {
        const data = {shipping_address_id: shipping, coupon_id: null}
            try {
                const response = await transaction.createTransactions(data)
                console.log(response)
                fintoc(response)
                
            } catch (err: any) {
                if (err.status === 400){outOfStock(err)}
                
        }}
        else {swal("Debes elegir una dirección de despacho", "", "warning")}}

    
    const outOfStock = (err: any) => {
        let errores = 'Los productos '
        Object.entries(err.body.errors).map((item:any) =>
        {
            let producto:any = parseInt(item[0].charAt(item[0].length - 1))
            let filtrado:any = posts.filter((el:ShoppingCartDetail) => el?.publication_item?.id === producto)[0]
            errores = errores.concat(
                filtrado.publication_item?.item.name + ', '
            )
        })
            
        errores = errores.slice(0, -2)
        console.log(errores)
        swal(
            {title: errores + ' ya no se encuentran disponibles', 
            icon: "warning", 
            buttons: {
                cancel: {
                  text: "Volver al carro",
                  visible: true,
                  value: 'cancel'
                },
                confirm: {
                  text: "Ir al catálogo",
                  visible: true,
                  value: 'confirm'
                }
              }
            })
        .then((value) => {
            switch (value) {
              case "cancel":
                navigate('/cart')
                break
           
              case "confirm":
                navigate('/catalog/all')
                break
            }
          });
    }
    
    const fintoc = (response: any) => {
        let public_key = import.meta.env["VITE_PUBLIC_KEY"]
        const widget:any = Fintoc?.create({
            publicKey: public_key,
            holderType: 'business',
            product: 'payments',
            widgetToken: response.widget_token,
            onSuccess: () => {
                cart.removeCart()
                navigate('/bought')
              }
          })
        widget.open()
    }

    const accountlessPayment = async (event: any) => {
        event.preventDefault()
        const publication_items_list = new Array<object>()
        let addressfield = address.split(",")[0]
        let commune = address.split(",")[1]
        posts.map((item: any) => 
            publication_items_list.push({id: item.publication_item.id, amount: item.amount})
        )
        
        const data = {
            buyer_name: name, buyer_lastname: lastName,
            phone_number: phone, email: mail,
            region: region, commune: commune, address: addressfield,
            publication_items_list: publication_items_list,
            coupon_id: null
        }
        console.log(data)
        try {
            const response = await transaction.createAccountlessTransactions(data)
            console.log(response)
            fintoc(response)
            
        } catch (err: any) {
            if (err.status === 400){outOfStock(err)}
        }
    };

    const formik = useFormik({
        initialValues: {
            cupon_code: ""
        },
        onSubmit: async (data) => {
            setCuponError({message: ''})
            const response = await transaction.validateCuponBuyer(data.cupon_code)
            const discount_percentage = JSON.parse(response).discount_percentage
            if (discount_percentage) {
                setDiscount(discount_percentage)
            }
            else {
                const message = JSON.parse(response).body
                setCuponError(message)
            }
        }
    })

    return (
        <div className="container mx-auto" style={{paddingTop: "5vh"}}>
        <div className="row" >
            {
                (!authentication) ? (
                    <AccountlessData payment={accountlessPayment} address={address} setName={setName} 
                    setLastName={setLastName} setPhone={setPhone} setMail={setMail} 
                    setAddress={setAddress} setRegion={setRegion}/>
                ) : (
                    <>
                    <ShippingOptions payment={payment}/>
                    </>
                )
            }
            <div className="col-md-6">
                <Card style={{paddingTop: "3%", paddingLeft: "3%", paddingBottom: "3%"}}>
                    <Card.Title style={{color:'#bf3b4b'}}>
                        <h4 style={{color:'#bf3b4b'}}>Resumen de compra</h4>   
                    </Card.Title>
                    <Card.Body>
                        <ShoppingSummary changedPrice={0} posts={posts} changed={0} discount={discount} />
                        </Card.Body>
                </Card>
                <Card className="d-flex my-3" style={{paddingTop: "3%", paddingLeft: "3%", paddingBottom: "3%"}}>
                    <Card.Title>
                        <h5>Tienes un cupón de descuento?</h5>
                    </Card.Title>
                    
                    <Card.Body>
                    {/* <p style={{marginTop: "-15px", marginBottom: "-5px"}}>Escríbelo a continuación para recibir su beneficio</p>
                    <input placeholder='Ingresar cupón' style={{width: "70%", marginRight: "10px", padding: "2px 8px", borderRadius: "5px", border: "1px solid grey"}}/>
                    <button className='displayed'>Aplicar</button> */}
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor='cupon_code' style={{marginTop: "-15px", marginBottom: "-5px"}}>Escríbelo a continuación para recibir su beneficio</label>
                            <input 
                                placeholder='Ingresar cupón'

                                style={
                                    cuponError.message ? {
                                        marginRight: "10px",
                                        width: "70%",
                                        border: "1px solid #ff6565",
                                        borderRadius: "5px",
                                        padding: "2px 8px"
                                    } : {width: "70%", marginRight: "10px", padding: "2px 8px", borderRadius: "5px", border: "1px solid grey"}}
                                type='text'
                                value={formik.values.cupon_code}
                                name='cupon_code'
                                onChange={formik.handleChange}
                            />
                        </div>
                        {cuponError.message ? (
                            <div style={{
                                color:'#FF6565', 
                                // padding:'.5em .2em', 
                                height:'1em', 
                                // position:'absolute', 
                                fontSize:'.8em'}}>
                                {cuponError.message}
                            </div>
                        ) : (discount !== 0) ? (
                            <div>
                                <p style={{height:'1em', fontSize:'.8em'}}>Cupón ingresado correctamente</p>
                            </div>
                        ) : null}
                        {/* {discount !== 0 ? (
                            <div>
                                <p>Cupón ingresado correctamente</p>
                            </div>
                        ) : null} */}
                        <button className='displayed' type='submit'>Aplicar</button>
                    </form>
                    </Card.Body>
                </Card>
            </div>

        
        </div>
        </div>

    );
}