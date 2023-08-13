import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../catalog/Catalog.css';
import ProductOnEvaluationButton from '../buttons/ProductOnEvaluationButton';
import AcceptPublicationButton from '../buttons/AcceptPublicationButton';
import RejectPublicationButton from '../buttons/RejectPublicationButton';

interface Props {
    title: string,
    price: string,
    brand: string,
    id: number,
    imgurl: string
}

export default function ProductOnEvaluation({ title, price, brand, id, imgurl }: Props) {

    return (
        <a style={{textDecoration: "none", color: "black"}} href={`/admin/products/${id}`}>
        <Card className="d-flex justify-content-between align-items-baseline mb-4">
            <Card.Img src={imgurl} variant={'top'} height={'290rem'} style={{overflow: "hidden"}}/>
            <Card.Body style={{padding: "0px"}}>
            <div>
            <p style={{textAlign: "left", marginLeft: "5%"}}>
                {brand}
            </p>
           <div style={{display: "flex", gap: "4.5rem"}}>
            <p style={{fontWeight: "bold", fontSize: "110%", marginTop: "-15px", textAlign: "left", marginLeft: "5%"}}>   
                {title}
            </p>
            <p style={{color: "#6C757D", textAlign: "right",  marginTop: "-15px", fontSize: "110%", marginRight: "10px"}}>
                ${price}
            </p>
            </div>
            </div>
            </Card.Body>

        </Card>
        </a>

    );

}