import '../../styles/NewPost.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import ComparisonCard from '../../components/seller/ComparisonCard';
import { BiEdit } from 'react-icons/bi';

interface CustomizedState {
  conflicts: any,
  data: object
}

const ItemConflict = () => {
    let location = useLocation();
    const state = location.state as CustomizedState;
    const { conflicts, data } = state;
    const navigate = useNavigate()

    return (
    <div className='container text-center mx-auto'>
        <h3>Conflicto en creación de ítems</h3>
        <button className='add-more' style={{width: "1000px", marginTop: "5px", marginBottom: "10px", border: "none"}} 
                onClick={() => navigate('/seller/new-post', {state: data})}>
          <BiEdit style={{marginRight: "1%"}}/>Volver a editar ítems
        </button>
        <p>Uno o más ítems que estás intentando crear ya existe(n) en nuestra base de datos. Sin embargo, sus atributos asociados son distintos a los que estás intentando ingresar.
        Te invitamos a revisar las diferencias para identificar si existió algún error de tu parte.
        En caso de que el problema esté en alguno de los ítems ya creados, escríbemos un correo electrónico para solucionarlo.</p>
      
        {
          Array.from(conflicts).map((item:any, index:number) => 
            <Row key={index}>
              <h5 style={{marginBottom: "2%", textAlign: "left"}}>{index + 1}. Ítem con SKU {item.item_in_form.sku}</h5>
              <ComparisonCard item={item.item_in_form} title='Datos existentes'/>
              <ComparisonCard item={item.current_item} title='Datos ingresados'/>
            </Row>
          )
        }

        
        
    </div> 

  )
}

export default ItemConflict;