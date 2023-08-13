import { Card } from 'react-bootstrap';
import './Category.css';

interface Props {
    title: string,
    imgurl: string
}

export default function CategoryCard({ title, imgurl }: Props) {

    return (
        
        
        <Card id='category-card'>
            <div id='category-img'>
            <Card.Img src={imgurl} height={'200px'} style= {{ objectFit: "cover"}} />
            <Card.ImgOverlay>
                <Card.Title id='category-title'>{title}</Card.Title>
            </Card.ImgOverlay>
            </div>
        </Card>

    );

}


