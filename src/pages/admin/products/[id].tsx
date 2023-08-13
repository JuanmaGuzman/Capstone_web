import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import '../../products/product.css';
import {Carousel, Col, Container, Row} from 'react-bootstrap';
import useProduct from '../../../store/product';
import { useParams } from 'react-router-dom';
import AcceptPublicationButton from '../../../components/buttons/AcceptPublicationButton';
import RejectPublicationButton from '../../../components/buttons/RejectPublicationButton';

function NonActiveProduct() {
    const id:any  = useParams();
    const producto:any = useProduct();

    const [newProduct, setNewProduct] = useState<any>();
    const [loading, setLoading] = useState(true);

    const [item, setItem] = useState(-1)
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [colors, setColors] = useState([])

    useEffect(() => {
      producto.getPublicationAsAdmin(parseInt(id.id))
      .then(setNewProduct)
      .finally(() => {setLoading(false)})
    }, [])

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
                      <select value={size} onChange={s => setSize(s.target.value)}>
                        <option value="sizeDefault">Escoja una talla</option>
                        {
                          sizes.map((size:string) => (
                            <option value={size}>{size}</option>
                          ))
                        }
                      </select>
                      <b style={{marginLeft: '10px'}}>Color: </b>
                      <select value={color} onChange={c => setColor(c.target.value)}>
                        <option value="colorDefault">Escoja un color</option>
                        {
                          colors.map((color:string) => (
                            <option value={color}>{color}</option>
                          ))
                        }
                      </select>
                    </div>
                      {
                        (item != -1) ?
                        (
                          <div className='row' style={{marginTop: '40px'}}><b style={{marginRight: "15%"}}>Cantidad disponible: {newProduct.publication_items[item].available}</b></div>
                        ) :
                        (
                          <div className='row'><b style={{marginTop: '40px'}}>Escoja talla y color ver stock del producto</b></div>
                        )
                      }
                      <div className='col' style={{marginInline: '10px'}}>
                        <AcceptPublicationButton publicationId={parseInt(id.id)}/>
                        <RejectPublicationButton publicationId={parseInt(id.id)}/>
                      </div>
                    </div>
                  </div>
              </Col>
            </div>
          ) : null
          }
          </div>
        </Container>
      </>
    );
  }

export default NonActiveProduct;