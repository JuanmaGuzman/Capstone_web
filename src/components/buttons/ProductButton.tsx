import './button.css'
import { useNavigate } from 'react-router'


interface Props {
    id: number,
}

export default function ProductButton({ id }: Props) {
    const navigate = useNavigate()
    function handleClick(){
        navigate("/products/" + id);
    }
    
    return (
        <button style={{marginBottom: '5%'}} className='displayed' onClick={handleClick}> Ver producto</button>
    );

}


