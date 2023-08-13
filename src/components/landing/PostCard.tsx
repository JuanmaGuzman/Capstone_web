import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../catalog/Catalog.css';
import { TbShoppingCart } from 'react-icons/tb';
import CartButton from '../buttons/CartButton';
import { useNavigate } from 'react-router';
import ProductButton from '../buttons/ProductButton';


interface Props {
    title: string,
    price: string,
    imgurl: string,
    id: number,
    stock: number
}

export default function PostCard({ title, price, imgurl, id, stock }: Props) {

    return (
        <a style={{textDecoration: "none", color: "black"}} href={`/products/${id}`}>
        <Card style={{height: "100%"}}>
            <Card.Img src={imgurl} variant={'top'} height={'280rem'} style={{width: "16vw", overflow: "auto"}}/>
            
            <Card.Body className="d-flex justify-content-between align-items-baseline mb-4">
                <h6>{title}</h6>
                <span className="text-muted">${price}</span>    
            </Card.Body>
        </Card>
        </a>

    );

}


