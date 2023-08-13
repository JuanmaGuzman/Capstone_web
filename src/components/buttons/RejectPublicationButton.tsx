import './button.css'
import useProduct from '../../store/product';
import swal from 'sweetalert';
import { useNavigate } from 'react-router'

interface Props {
  publicationId: number
}


export default function RejectPublicationButton({ publicationId }: Props) {
    const product:any = useProduct()
    const navigate = useNavigate()
    
    const handleButton = async (productId:number) => {
        await product.rejectPublication(productId);
    }

    const alert = () => {
        swal({
            title: '¿Estas seguro que deseas rechazar esta publicación?',
            icon: 'warning',
            text: 'La publicación se eliminará de las postulaciones',
            buttons: {
              cancel: {
                text: "Cancelar",
                visible: true,
                value: 'cancel'
              },
              confirm: {
                text: "Rechazar",
                visible: true,
                value: 'confirm'
              }
            }
          })
          .then((value) => {
            switch (value) {
           
              case "confirm":
                handleButton(publicationId)
                navigate('/admin/products/all')
                break
           
              case "cancel":
                break
            }
          });
    }

    return (
        <>
        <button className='displayed' onClick={() => alert()}>
            Rechazar publicación
        </button>
        </>
    );
}