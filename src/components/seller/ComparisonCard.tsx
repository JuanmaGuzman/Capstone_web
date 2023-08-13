import '../../styles/NewPost.css'
import { Card, Col } from 'react-bootstrap';

interface Props {
    item: any,
    title: string
}

const ComparisonCard = ({ item, title }: Props) => {
	return (
		<Col sm={6}>
            <Card style={{marginBottom: "5%"}}>  
                <p style={{paddingTop: "3%", fontWeight: "bolder", color: "white", backgroundColor: "#bf3f4b", borderRadius: "5px", paddingBottom:"3%", marginBottom: "-3%", fontSize: "110%"}}>{title}</p>
                <hr style={{backgroundColor: "#bf3f4b", color: "white"}}/>
                <p><strong style={{marginRight: "2px"}}>Nombre:</strong> {item.name}</p>
                <p><strong style={{marginRight: "2px"}}>Marca:</strong> {item.brand}</p>
                <p><strong style={{marginRight: "2px"}}>Talla:</strong> {item.size}</p>
                <p><strong style={{marginRight: "2px"}}>Color:</strong> {item.color}</p>
            </Card>
        </Col>
	)
}

export default ComparisonCard
