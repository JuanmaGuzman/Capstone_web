import React from 'react';
import { useState, useEffect, useMemo } from 'react'
import './product.css'
import swal from 'sweetalert';
import useAuth from '../../store/auth'
import { useProfile } from "../../store/profile"
import { TbShoppingCart } from 'react-icons/tb'
import {Carousel, Col, Container, Row} from 'react-bootstrap'
import useProduct from '../../store/product'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import CartButton from '../../components/buttons/CartButton'

const removeStyle = {
  marginRight: "5px",
  borderRadius: "5px",
  width: "40px",
  height: "30px",
  border: "1px solid grey",
  backgroundColor: "white",
  marginTop: "20px"
};

const addStyle = {
  marginLeft: "5px",
  borderRadius: "5px",
  width: "40px",
  height: "30px",
  border: "1px solid grey",
  backgroundColor: "white",
};

function Product() {
  const id:any  = useParams();
  const producto:any = useProduct();
  const navigate = useNavigate()
  const auth:any = useAuth()
  const profile:any = useProfile()
  const [newProduct, setNewProduct] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [item, setItem] = useState(-1)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [colors, setColors] = useState([])

  const [user, setUser] = useState<any>()
  let localUser = localStorage.getItem('user')

  useEffect(() => {
      if (auth.isLoggedIn() || localUser != null) {
        profile.getInformationUser()
        .then(setUser)
      }
      producto.getPublication(parseInt(id.id))
      .then(setNewProduct)
      .finally(() => {setLoading(false)})

  }, [])

  const [quantity, setQuantity] = useState(1);

  useMemo(() => {
    setQuantity(1)
  }, [item])

  useMemo(() => {
    if (!loading)
      setColors(newProduct.publication_items.filter((post:any) => post.item.size == size).map((post:any) => post.item.color))
    if (size == "sizeDefault") {
      setColors([])
      setColor("colorDefault")
      setItem(-1)
    }
  }, [size, loading])

  useMemo(() => {
    if (size != "sizeDefault" && color != "colorDefault" && !loading){
      setItem(newProduct.publication_items.findIndex((post:any) => post.item.size == size && post.item.color == color))
    }
    else 
      setItem(-1)
  }, [color])

  const handleRemove = async (publicationId:number) => {
    await producto.removePublication(publicationId);
}

  const RemoveAlert = () => {
    swal({
        title: '¿Estas seguro que deseas borrar esta publicación?',
        icon: 'warning',
        text: 'La publicación se eliminará del catálogo',
        buttons: {
          cancel: {
            text: "Cancelar",
            visible: true,
            value: 'cancel'
          },
          confirm: {
            text: "Eliminar",
            visible: true,
            value: 'confirm'
          }
        }
      })
      .then((value) => {
        switch (value) {
       
          case "confirm":
            handleRemove(newProduct.id)
            navigate('/catalog/all')
            break
       
          case "cancel":
            break
        }
      });
}

  if (loading) {
    return (
        <div>
            <section className='container'>
                <h2 style={{marginTop: "1000px"}}>Loading...</h2>
            </section>
        </div>
      )
  }

  const sizes:Array<any> = [...new Set(newProduct.publication_items.map((post:any) => post.item.size))]

  return (
    <>
    {
      (!loading) ? (
      <Container>
        <div className="app">
        {
          (!loading) ? (
          <div className="row">
            <Col>
              <Carousel>
              {
                newProduct.photo_uris.map((photo: any, index: number) =>( 
                  <Carousel.Item interval={1000} key={index}>
                    <img className="d-block w-100" src={photo} alt=""/>
                  </Carousel.Item>
                ))   
              }
              </Carousel>
            </Col>
            <Col>
                <div className="details" key={newProduct.id}>
                  <div className="box">
                    <div className="row">
                      <h2 style={{ color: "#bf3b4b", marginBottom: "7%"}}>{newProduct.publication_items[0].item.name}</h2>
                      <span>${newProduct.price}</span>
                    </div>
                    <p style={{ marginBottom: "7%" }}>{newProduct.description}</p>
                    <div className="col">
                      <b>Talla: </b>
                      <select style={{borderRadius: "3px", fontSize: "90%", paddingRight: "5px", paddingLeft: "2px"}} value={size} onChange={s => setSize(s.target.value)}>
                        <option value="sizeDefault">Escoja una talla</option>
                        {
                          sizes.map((size:string) => (
                            <option value={size}>{size}</option>
                          ))
                        }
                      </select>
                      <b style={{marginLeft: '10px'}}>Color: </b>
                      <select style={{borderRadius: "3px", fontSize: "90%", paddingRight: "5px", paddingLeft: "2px"}}  value={color} onChange={c => setColor(c.target.value)}>
                        <option value="colorDefault">Escoja un color</option>
                        {
                          colors.map((color:string) => (
                            <option value={color}>{color}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='col'>
                    </div>
                    {
                      (item != -1) ?
                      (
                        <b style={{ marginBottom: "7%", marginRight: "15%"}}>Cantidad disponible: {newProduct.publication_items[item].available}</b>
                      ) : (null)
                    }
                    {
                      (item != -1) ?
                      (
                      (newProduct.publication_items[item].available === 0) ?
                      (
                        <>
                          <p> </p>
                        </>
                      ) : (quantity === 1 && quantity === newProduct.publication_items[item].available) ? (
                        <>
                          <button onClick={() => setQuantity(quantity - 1)} className="remove" type="button" style={removeStyle} disabled={true}> - </button>
                          <span className="cart-quantity">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="add" type="button" style={addStyle} disabled={true}> + </button>
                        </>
                      ) : (quantity === 1) ? 
                      (
                        <>
                          <button onClick={() => setQuantity(quantity - 1)} className="remove" type="button" style={removeStyle} disabled={true}> - </button>
                          <span className="cart-quantity">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="add" type="button" style={addStyle}> + </button>
                        </>
                      ) : (quantity ===  newProduct.publication_items[item].available) ?
                      (
                        <>
                          <button onClick={() => setQuantity(quantity - 1)} className="remove" type="button" style={removeStyle}> - </button>
                          <span className="cart-quantity">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="add" type="button" style={addStyle} disabled={true}> + </button>
                        </>
                      ) :
                      (
                        <>
                          <button onClick={() => setQuantity(quantity - 1)} className="remove" type="button" style={removeStyle}> - </button>
                          <span className="cart-quantity">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="add" type="button" style={addStyle}> + </button>
                        </>
                      )
                      ) : (null)
                    }
                    {(item != -1) ? (
                      <CartButton productId={parseInt(id.id)} productAmount={{amount: quantity}} fromDetail={true} stock={newProduct.publication_items[item].available} publicationId={newProduct.publication_items[item].id}/>
                    ) : <div className='row' style={{marginTop: '-20px'}}><b style={{marginTop: '5rem'}}>Escoja talla y color para ver disponibilidad</b></div>}
                    {
                    (user?.is_admin && localUser != null) ? (
                      <button className='displayed' onClick={() => RemoveAlert()}>Eliminar publicación</button>
                    ) : null
                }
                  </div>
                </div>
            </Col>
          </div>
        ) : null
        }
        </div>
      </Container>) : null
    }
    </>
  );
}

export default Product;