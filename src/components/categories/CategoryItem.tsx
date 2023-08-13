import 'bootstrap/dist/css/bootstrap.min.css';
import './CategoryItem.css'
import { Col } from 'react-bootstrap';

interface Props {
    name: string,
    image_uri: string
}

export default function CategoryItem({ name, image_uri }: Props) {
    
    return (
        <Col sm={4}>
        <div style={{display: "flex", marginTop: "1em", marginBottom: "2em"}}>      
            <img style={{width: "8em", height: "8em", borderRadius: "50%"}} src={image_uri} alt="category"></img>
            <div style={{marginLeft: "1em", width: "50%", margin: "auto", alignItems: "center", justifyContent:"center"}}>
            <p>Explora la categoría</p>
            <a className='category-link' href={`/catalog/${name.toLowerCase()}`}><h5>{name}</h5></a>
            </div>
        </div>
        </Col>    
    );
}
