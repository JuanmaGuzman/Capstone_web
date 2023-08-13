import './button.css'
import useProduct from '../../store/product';
import swal from 'sweetalert';
import { useNavigate } from 'react-router'

interface Props {
  publicationId: number
}


export default function AcceptPublicationButton({ publicationId }: Props) {
    const product:any = useProduct()
    const navigate = useNavigate()
    
    const handleButton = async (productId:number) => {
        await product.acceptPublication(productId);
    }

    const alert = () => {
        swal({
            title: '¿Estas seguro que deseas aceptar esta publicación?',
            icon: 'warning',
            text: 'La publicación se integrará al catálogo',
            buttons: {
              cancel: {
                text: "Cancelar",
                visible: true,
                value: 'cancel'
              },
              confirm: {
                text: "Aceptar",
                visible: true,
                value: 'confirm'
              }
            }
          })
          .then((value) => {
            switch (value) {
           
              case "confirm":
                handleButton(publicationId)
                success()
                break
           
              case "cancel":
                break
            }
          });
    }

    const success = () => {
      swal({
          title: 'Publicación agregada al catálogo!',
          icon: 'success',
          buttons: {
            cancel: {
              text: "Seguir viendo publicaciones nuevas",
              visible: true,
              value: 'cancel'
            },
            confirm: {
              text: "Ir a publicación",
              visible: true,
              value: 'confirm'
            }
          }
        })
        .then((value) => {
          switch (value) {
         
            case "confirm":
              navigate('/products/' + publicationId)
              break
         
            case "cancel":
              navigate('/admin/products/all')
              break
          }
        });
  }

    return (
        <>
        <button className='displayed' style={{marginRight: '10px'}} type="button" onClick={() => alert()}>
            Aceptar publicación
        </button>
        </>
    );
}