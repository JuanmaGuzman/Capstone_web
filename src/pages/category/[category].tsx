import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row } from 'react-bootstrap';

import { useParams } from 'react-router';


const subcategories = [
    {category: "Vestuario Mujer", sub: ["Poleras y Blusas", "Sweaters y Chalecos", 
                                    "Vestidos y Enteritos", "Jeans, Patalones y Calzas",
                                    "Shorts y Faldas", "Parcas y Chaquetas"]},
    {category: "Decohogar-Decoración", sub: ["Porta maceteros", "Porta sombreros", 
                                    "Porta guitarras", "Caminos de mesas",
                                    "Individuales", "Porta servilletas",
                                    "Porta toalla nova", "Porta papel higiénico",
                                    "Carteras", "Bolsos", "Adornos navideños"]},
    {category: "Hogar-Dormitorio", sub: ["Cubrecolchones", "Sabanas", 
                                    "Plumones", "Colchas",
                                    "Bajada de cama", "Frazadas",
                                    "Faldones", "Cortinas",
                                    "Visillos"]},
    {category: "Hogar-Baño", sub: ["Set de baño", "Toallas", "Porta papel higiénico", "Colchas",
                                    "Batas", "Piso de baño"]},                   
    {category: "Hogar- Living Comedor", sub: ["Cojines", "Funda de cojines", "Porta papel higiénico", "Colchas",
                                    "Batas", "Piso de baño"]},                                                 
]

export default function CategoryList() {
    const { category } = useParams();
    return (
        <div className='container text-center mx-auto'>
            <h2>Subcategorías de {category}</h2>
            <Row>
               
            </Row>
        </div>
    );
}
