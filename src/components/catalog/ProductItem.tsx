import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Catalog.css';
import ProductButton from '../buttons/ProductButton';
import CartButton from '../buttons/CartButton';

interface Props {
    title: string,
    price: string,
    brand: string,
    id: number,
    stock: number,
    imgurl: string
}

export default function ProductItem({ title, price, brand, id, stock, imgurl }: Props) {

    return (
        <a style={{textDecoration: "none", color: "black"}} href={`/products/${id}`}>
        <Card className="d-flex embed-responsive justify-content-between align-items-baseline mb-4">
            <Card.Img src={imgurl} variant={'top'} height={'280rem'} style={{width: "100%", overflow: "auto"}}/>
            <Card.Body style={{padding: "0px"}}>
            <div>
            <p style={{textAlign: "left", marginLeft: "5%"}}>
                {brand}
            </p>
           <div style={{display: "flex", gap: "4.5rem"}}>
            <p style={{fontWeight: "bold", fontSize: "120%", marginTop: "-15px", textAlign: "left", marginLeft: "5%"}}>   
                {title}
            </p>
            <p style={{color: "#6C757D", textAlign: "right",  marginTop: "-15px", fontSize: "110%"}}>
                ${price}
            </p>
            </div>
                
            </div>
            </Card.Body>

        </Card>
        </a>

    );

}