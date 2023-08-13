import { useState, useEffect } from "react";
import "./cart.css";
import { BsCart } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import useCart from '../store/cart';
import CartQuantityButton from "../components/buttons/QuantityButton";
import ShoppingSummary from "../components/shopping-cart/ShoppingSummary";
import useAuth from '../store/auth';
import { Container, Row, Col, Card } from "react-bootstrap";
import useProduct from '../store/product'

function Cart() {
  const cart:any = useCart()
  const auth:any = useAuth()
  
  const [posts, setPosts] = useState<Array<any>>([])
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  
  useEffect(() => {
    if (auth.isLoggedIn()){
      cart.myCart()
      .then(setPosts)
      .finally(setLoading(false))
    } else {
      const storedCart = localStorage.getItem('cart')
      if (storedCart !== null) setPosts(JSON.parse(storedCart))
      setLoading(false)
    }
  }, [loading])

  return (
    <div className="d-flex cart-outer-div">
      <div className="cart-body">
        {posts.length ? (
          <CartWithItems posts={posts} setLoading={setLoading} changed={changed} setChanged={setChanged} setPriceChange={setPriceChange} priceChange={priceChange}/>
        ) : (
          <div className="container my-5" style={{ textAlign: "center" }}>
            <div style={{fontSize: '600%'}}><BsCart /></div>
            <div className="mt-4">
              <h4 className="fw-600" style={{color:'#bf3b4b'}}>Tu carrito se encuentra vacío</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const CartWithItems = (props: any) => {
  const posts = props.posts
  const setLoading = props.setLoading
  const changed = props.changed
  const setChanged = props.setChanged
  const setPriceChange = props.setPriceChange
  const priceChange = props.priceChange
  let navigate = useNavigate();
  const cart:any = useCart()
  
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)

  const checkout = () => {
    navigate("/checkout")
  }
  
  const removeItemFromCart = (publicationId:number) => {
    cart.removeItem(publicationId)
    setLoading(true)
  }

  return (
    <Container>
      <Row style={{paddingTop: "5vh"}}>
        <Col style={{paddingRight: "100px"}}>
        
          <h4 style={{color:"#bf3b4b" }}>
            Mi carro de compras
          </h4>
          <hr/>
          <div className="row" >
            <div  className="col-md-12">
              <ul style={{ padding: 0 }}>
                {
                  posts.map((post: any, key: number) =>   
                    <div key={key}>
                      {(!post.amount) ? null : (
                        <li style={{ listStyle: "none" }}>
                          <div className="cart-items">
                            <img
                             src={(post.publication_item.publication_info.image_uris) ? (post.publication_item.publication_info.image_uris[0]) : (null)}
                            // src={"https://oldnavy.gap.com/Asset_Archive/ONWeb/content/0029/395/863/assets/220700_96-M7659_W_DP_Tops.jpg"}
                            width="80px" height="80px"
                            style={{ borderRadius: "50%" }}
                            alt="icon"/>
                            <h6 className="mt-15">{post.publication_item.item.name}</h6>

                            <CartQuantityButton post={post} initialAmount={post.amount} setChanged={setChanged} changed={changed} setPriceChange={setPriceChange}/>
                            <div className="mt-15"><button type="button" className="btn-close" aria-label="Close" onClick={() => {removeItemFromCart(post.publication_item.item.id)}}></button></div>
                          </div>
                          
                        </li>
                      )}
                    </div>   
                  )
                }
              </ul>
            </div>
          </div>
         
        </Col>
        <Col>
        
        <h4 style={{color:'#bf3b4b'}}>Resumen</h4>
        <hr/>
        <ShoppingSummary changed={changed} posts={posts} changedPrice={priceChange} discount={0} />
        
        </Col>
      </Row>
      <div className="d-flex justify-content-center">
        <button onClick={checkout} className="btn btn-primary" type="button" style={{backgroundColor:'#bf3b4b', border:"#bf3b4b"}}>
          Continuar compra
        </button> 
      </div>
    </Container>
    
    
  );
};

export default Cart;