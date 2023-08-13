import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.css';
import useProduct from '../store/product';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CategoryItem from '../components/categories/CategoryItem';


export default function Categories() {
    const product:any = useProduct();
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        product.allCategories()
            .then(setCategories)
      }, []);
    
    return (
        <div className="container text-center mx-auto" style={{marginBottom: "10%"}}>
            <Row>
                {
                    categories.map((item:any) =>
                        <CategoryItem image_uri={item.image_uri} name={item.name.charAt(0).toUpperCase() + item.name.slice(1)}/>
                    )
                }
            </Row>
        </div>
    );
}
